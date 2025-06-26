import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();

  const fetchReminders = async () => {
    try {
      const res = await axios.get("/reminders");
      setReminders(res.data);
    } catch (error) {
      console.error("Failed to load reminders", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      await axios.delete(`/reminders/${id}`);
      setReminders((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleEdit = (reminder) => {
    navigate(`/edit/${reminder.id}`);
  };

  const getNextDueDate = (r) => {
    const date = new Date(r.lastPasswordChangeDate);
    date.setDate(date.getDate() + r.changeIntervalDays);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">All Reminders</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Account</th>
            <th className="border px-2 py-1">Last Changed</th>
            <th className="border px-2 py-1">Interval (Days)</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Next Due</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((r) => (
            <tr key={r.id}>
              <td className="border px-2 py-1">{r.accountName}</td>
              <td className="border px-2 py-1">{r.lastPasswordChangeDate}</td>
              <td className="border px-2 py-1">{r.changeIntervalDays}</td>
              <td className="border px-2 py-1">{r.userEmail}</td>
              <td className="border px-2 py-1">{getNextDueDate(r)}</td>
              <td className="border px-2 py-1">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => handleEdit(r)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
