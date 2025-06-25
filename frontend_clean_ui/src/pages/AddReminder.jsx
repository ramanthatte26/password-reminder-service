import axios from "../axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddReminder({ onSaved }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountName: "",
    lastPasswordChangeDate: "",
    changeIntervalDays: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/reminders", form);
      alert("✅ Reminder created successfully!");
      setForm({
        accountName: "",
        lastPasswordChangeDate: "",
        changeIntervalDays: "",
      });
      onSaved?.(); // optional callback
      navigate("/home");
    } catch (err) {
      alert("❌ Failed to save reminder");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">🔐 Add a New Password Reminder</h1>
      <p className="mb-4 text-sm text-gray-600">
        Enter your account details. We'll remind you before it's due!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Account Name</label>
          <input
            type="text"
            name="accountName"
            required
            className="border p-2 w-full"
            value={form.accountName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Last Password Change Date</label>
          <input
            type="date"
            name="lastPasswordChangeDate"
            required
            className="border p-2 w-full"
            value={form.lastPasswordChangeDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Interval (Days)</label>
          <input
            type="number"
            name="changeIntervalDays"
            required
            className="border p-2 w-full"
            value={form.changeIntervalDays}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Reminder
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReminder;
