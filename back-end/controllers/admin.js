const adminModel = require("../models/admin");
const { generateToken } = require("../utility/generateToken");
const slotModel = require("../models/slots");
const appointment = require("../models/appointment");
const bcrypt = require("bcrypt");
require('dotenv').config();
const { generateSlots } = require("../utility/generateSlots");
const { isSunday } = require("../utility/isSunday");


// module.exports.createadmin = async (req, res) => {
//     try {
//         const { fullname, email, password } = req.body;
//         const exists = await adminModel.findOne({ email });
//         if (exists) return res.status(400).send("Admin already exists");
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(password, salt, async (err, hash) => {
//                 if (err) throw err;
//                 let createdUser = await adminModel.create({
//                     fullname,
//                     email,
//                     password: hash,
//                     role: "admin",
//                 });
//                 return res.status(201).json({
//                     success: true,
//                     message: "Admin created successfully",
//                 });

//             })
//         })
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: err.message
//         });
//     }
// }

module.exports.createadmin = async (req, res) => {
    try {
        const {
            fullname,
            email,
            password,
            role,
            specialization,
            experience,
            bio,
            image
        } = req.body;

        // Check if admin already exists
        const exists = await adminModel.findOne({ email });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create admin
        const createdAdmin = await adminModel.create({
            fullname,
            email,
            password: hash,
            role: role || "admin",
            specialization,
            experience,
            bio,
        });

        // Convert to object & remove password
        const adminData = createdAdmin.toObject();
        delete adminData.password;

        return res.status(201).json({
            success: true,
            message: "Admin created successfully",
            admin: adminData
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


module.exports.superadmin_login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });
        if (!admin || admin.role !== "superadmin") {
            return res.status(403).json({
                success: false,
                message: "Not a superadmin",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = generateToken(admin);

        // 🔴 VERY IMPORTANT
        res.cookie("adminToken", token, {
            httpOnly: true,
            sameSite: "lax", // ✅ default, safe
        });


        return res.status(200).json({
            success: true,
             token:token,
            role: admin.role,
        });
    } catch (err) {
        console.error("SuperAdmin login error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports.logout = (req, res) => {
    res.clearCookie("adminToken", {
        sameSite: "none",
        secure: false, // localhost
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

module.exports.createSuperadmin = async (req, res) => {
    const { fullname, email, password } = req.body;

    const exists = await adminModel.findOne({ role: "superadmin" });
    if (exists) return res.status(400).json({ success: false, message: "superadmin already exists" });


    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) throw err;
            const superadmin = await adminModel.create({
                fullname,
                email,
                password: hash,
                role: "superadmin",
            });
            res.status(201).json({ success: true, message: "superadmin created successfully", superadmin });
        })
    })
}


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill all fields",
            });
        }

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        if (admin.role === "superadmin") {
            return res.status(403).json({
                success: false,
                message: "Please login via Super Admin",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = generateToken(admin);

        res.cookie("adminToken", token, {
            httpOnly: true,
            sameSite: "lax", // ✅ default, safe
        });


        return res.status(200).json({
            success: true,
            token:token,
            role: "admin",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports.generateSlotsByAdmin = async (req, res) => {
    try {
        let { dateStr, startHour, endHour, durationMin } = req.body;

        if (!dateStr) return res.status(400).send("dateStr is required");

        if (isSunday(dateStr))
            return res.status(200).json({ message: "Sunday - Holiday", slots: [] });

        // defaults
        startHour = startHour || 16;
        endHour = endHour || 23;
        durationMin = durationMin || 30;

        const generatedSlots = generateSlots(dateStr, startHour, endHour, durationMin);

        let slotDoc = await slotModel.findOne({ date: dateStr });

        if (slotDoc) {
            slotDoc.slots = generatedSlots;
            await slotDoc.save();
            //   return res.json({ message: "Slots updated", slots: generatedSlots });
            res.render("adminHomepage");
        }

        slotDoc = await slotModel.create({ date: dateStr, slots: generatedSlots });
        return res.json({
            success: true,
            message: "Slots generated successfully",
        });

    } catch (err) {
        return res.json({
            success: false,
            message: err.message,
        });
    }
};

module.exports.displayAppointments = async (req, res) => {
    try {
        const appointments = await appointment
            .find()
            .populate("users");

        return res.status(200).json({
            success: true,
            appointments,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports.getDoctors = async (req, res) => {
    try {
        const doctors = await adminModel
            .find({ role: "admin" })
            .select("-password");

        res.status(200).json({
            success: true,
            doctors
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
