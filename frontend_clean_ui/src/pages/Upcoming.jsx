import axios from "../axiosConfig";
import { useEffect, useState } from "react";

function Upcoming() {
  const [reminders, setReminders] = useState([]);

  const fetchUpcoming = async () => {
    try {
      const res = await axios.get("/reminders/upcoming");
      setReminders(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch upcoming reminders", err);
    }
  };

  const sendEmail = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        alert("⚠️ Email not found in local storage.");
        return;
      }
      await axios.post(`/reminders/send-for-user?userEmail=${email}`);
      alert("📧 Email sent!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send emails");
    }
  };

  const markAsChanged = async (id) => {
    try {
      await axios.put(`/reminders/${id}/mark-changed`);
      fetchUpcoming();
    } catch (err) {
      alert("❌ Failed to mark as changed");
    }
  };

  const getDueDate = (r) => {
    const date = new Date(r.lastPasswordChangeDate);
    date.setDate(date.getDate() + r.changeIntervalDays);
    return date.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  return (
    <div className="page-container">
      <h1>🔔 Upcoming Reminders (Due Tomorrow)</h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button className="btn btn-primary" onClick={fetchUpcoming}>
          🔁 Refresh
        </button>
        <button className="btn btn-success" onClick={sendEmail}>
          📬 Send My Email
        </button>
      </div>

      {reminders.length === 0 ? (
        <p className="info-text">No upcoming reminders for tomorrow 🎉</p>
      ) : (
        <table className="reminder-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Next Due</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((r) => (
              <tr key={r.id}>
                <td>{r.accountName}</td>
                <td>{getDueDate(r)}</td>
                <td>{r.userEmail}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => markAsChanged(r.id)}
                  >
                    Mark as Changed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Upcoming;
