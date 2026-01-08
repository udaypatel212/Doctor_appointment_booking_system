import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/admin/appointments",
        { withCredentials: true }
      );

      console.log(data.appointments);
      setAppointments(data.appointments);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/admin/login");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, [navigate]);


    if (loading) {
        return <div className="text-center mt-20">Loading appointments...</div>;
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Patient Appointments
            </h1>

            {appointments.length === 0 ? (
                <p className="text-center text-gray-500">
                    No appointments booked yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((apt) => (
                                <tr key={apt._id}>
                                    <td>{apt.name}</td>
                                    <td>{apt.email}</td>
                                    <td>{apt.users?.[0]?.phone}</td>
                                    <td>
                                        {new Date(apt.appointmentTime).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {new Date(apt.appointmentTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="text-center mt-6">
                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="btn btn-outline"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
