const express = require('express');
const router = express.Router();
const verifySuperAdmin = require("../middlewares/verifySuperadmin");
const isBothLogin = require("../middlewares/isBothLogin");
const { login, createadmin, displayAppointments, createSuperadmin, logout, generateSlotsByAdmin, superadmin_login } = require("../controllers/admin");


// Create Admin — only superadmin can access 


router.get("/me", isBothLogin, (req, res) => {
    res.json({
        success: true,
        role: req.admin.role,
    });
});

router.post("/create-superadmin", createSuperadmin);
router.post("/create", verifySuperAdmin, createadmin);
router.post("/superadmin_login", superadmin_login);
router.post("/login", login);
router.post("/logout", logout);
router.post("/generateSlot", isBothLogin, generateSlotsByAdmin);
router.get("/appointments", isBothLogin, displayAppointments);

module.exports = router;