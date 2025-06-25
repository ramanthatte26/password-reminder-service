import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditReminder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountName: "",
    lastPasswordChangeDate: "",
    changeIntervalDays: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`/reminders/${id}`)
      .then(res => setForm(res.data))
      .catch(err => {
        console.error("Failed to load reminder", err);
        toast.error("❌ Reminder not found.");
        navigate("/home");
      });
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.accountName.trim()) errs.accountName = "Account name is required.";
    if (!form.lastPasswordChangeDate) errs.lastPasswordChangeDate = "Date is required.";
    else if (new Date(form.lastPasswordChangeDate) > new Date()) errs.lastPasswordChangeDate = "Date cannot be in the future.";
    if (!form.changeIntervalDays || isNaN(form.changeIntervalDays)) errs.changeIntervalDays = "Valid interval is required.";
    else if (Number(form.changeIntervalDays) <= 0) errs.changeIntervalDays = "Interval must be > 0.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await axios.put(`/reminders/${id}`, form);
      toast.success("✅ Reminder updated successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("❌ Failed to update reminder.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container">
      <h1>✏️ Edit Reminder</h1>
      <form onSubmit={handleSubmit} className="reminder-form">
        <label>Account Name:</label>
        <input type="text" name="accountName" value={form.accountName} onChange={handleChange} />
        {errors.accountName && <p className="error">{errors.accountName}</p>}

        <label>Last Password Change Date:</label>
        <input type="date" name="lastPasswordChangeDate" value={form.lastPasswordChangeDate} onChange={handleChange} />
        {errors.lastPasswordChangeDate && <p className="error">{errors.lastPasswordChangeDate}</p>}

        <label>Interval (Days):</label>
        <input type="number" name="changeIntervalDays" value={form.changeIntervalDays} onChange={handleChange} />
        {errors.changeIntervalDays && <p className="error">{errors.changeIntervalDays}</p>}

        <button type="submit" className="btn btn-primary">🔁 Update Reminder</button>
      </form>
    </div>
  );
};

export default EditReminder;
