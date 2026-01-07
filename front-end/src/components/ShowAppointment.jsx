import { useEffect, useState } from "react";

export default function ShowAppointment({ endpoint }) {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await fetch(endpoint, {
                credentials: "include",
            });
            const data = await res.json();

            if (data.success) {
                setAppointments(data.appointments);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center">Loading appointments...</p>;
    }

    if (!appointments.length) {
        return <p className="text-center text-gray-500">No appointments found</p>;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bzold text-orange-600 mb-2">
                My Appointments
            </h3>

            {appointments.map((appt) => (
                <div
                    key={appt._id}
                    className="card bg-base-100 shadow-md p-4 rounded-xl"
                >
                    <p className="font-semibold">
                        {new Date(appt.appointmentTime).toLocaleDateString()} •{" "}
                        {new Date(appt.appointmentTime).toLocaleTimeString()}
                    </p>

                    <p className="text-sm text-gray-600">
                        Doctor: {appt.doctorName || "Assigned Doctor"}
                    </p>

                    <p
                        className={`text-sm font-bold ${appt.status === "booked"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                    >
                        Status: {appt.status || "Booked"}
                    </p>
                </div>
            ))}
        </div>
    );
}
