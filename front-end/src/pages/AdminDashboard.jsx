import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
export default function AdminDashboard() {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    // Fetch logged-in admin info
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/admin/me", {
                    credentials: "include",
                });

                if (!res.ok) {
                    navigate("/admin/login");
                    return;
                }

                const data = await res.json();
                setRole(data.role);
            } catch (err) {
                navigate("/admin/login");
            }
        };

        checkAuth();
    }, [navigate]);


    // Logout
    const handleLogout = async () => {
        await fetch("/admin/logout", {
            method: "POST",
            credentials: "include",
        });
        localStorage.setItem("adminToken", "");

            // optional (but useful)
            localStorage.setItem("admin","");

        navigate("/");
    };


    // Create Admin (superadmin only)
    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        const f = e.target;

        await fetch("/admin/create", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullname: f.fullname.value,
                email: f.email.value,
                password: f.password.value,
            }),
        });

        alert("Admin created successfully");
        f.reset();
    };

    // Generate slots
    const handleGenerateSlots = async (e) => {
        e.preventDefault();
        const f = e.target;

        await fetch("/admin/generateSlot", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dateStr: f.dateStr.value,
                startHour: f.startHour.value,
                endHour: f.endHour.value,
                durationMin: f.durationMin.value,
            }),
        });

        alert("Slots generated");
        f.reset();
    };

    if (!role) {
        return <div className="text-center mt-20">Loading dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-base-200">
            {/* Header */}
            <Navbar/>
            <header className="bg-gray-800 text-white py-4 text-center text-2xl font-bold">
                Admin Dashboard
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* CREATE ADMIN – SUPERADMIN ONLY */}
                {role === "superadmin" && (
                    <div className="card bg-base-100 shadow-xl p-5">
                        <h3 className="text-lg font-bold mb-3">Create Admin</h3>
                        <form onSubmit={handleCreateAdmin} className="flex flex-col gap-2">
                            <input name="fullname" placeholder="Full Name" className="input input-bordered" required />
                            <input name="email" placeholder="Email" className="input input-bordered" required />
                            <input name="password" placeholder="Password" className="input input-bordered" required />
                            <button className="btn btn-primary">Create Admin</button>
                        </form>
                    </div>
                )}

                {/* GENERATE SLOTS – ALL ADMINS */}
                <div className="card bg-base-100 shadow-xl p-5">
                    <h3 className="text-lg font-bold mb-3">Generate Slots</h3>
                    <form onSubmit={handleGenerateSlots} className="flex flex-col gap-2">
                        <input type="date" name="dateStr" className="input input-bordered" required />
                        <input type="number" name="startHour" placeholder="Start Hour" className="input input-bordered" />
                        <input type="number" name="endHour" placeholder="End Hour" className="input input-bordered" />
                        <input type="number" name="durationMin" placeholder="Duration (min)" className="input input-bordered" />
                        <button className="btn btn-primary">Generate Slots</button>
                    </form>
                </div>

                {/* DISPLAY APPOINTMENTS – ALL ADMINS */}
                <div className="card bg-base-100 shadow-xl p-5">
                    <h3 className="text-lg font-bold mb-3">Display Appointments</h3>
                    <button
                        onClick={() => navigate("/admin/appointments")}
                        className="btn btn-primary"
                    >
                        Show Appointments
                    </button>
                </div>

                {/* LOGOUT – ALL ADMINS */}
                <div className="card bg-base-100 shadow-xl p-5">
                    <h3 className="text-lg font-bold mb-3">Logout</h3>
                    <button onClick={handleLogout} className="btn btn-error">
                        Logout
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-4 text-gray-600">
                © 2025 Admin Dashboard
            </footer>
        </div>
    );
}
