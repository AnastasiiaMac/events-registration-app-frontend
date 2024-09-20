import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registerForEvent } from "../../services/api";
import css from "./EventRegistration.module.css";

const EventRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    referral: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerForEvent(id, formData);
    navigate("/");
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <h1>Register for Event</h1>
        <div className={css.formGroup}>
          <label className={css.label}>Full Name:</label>
          <input
            type="text"
            name="fullName"
            className={css.input}
            onChange={handleChange}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Email:</label>
          <input
            type="email"
            name="email"
            className={css.input}
            onChange={handleChange}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            className={css.input}
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>
            Where did you hear about this event?
          </label>
          <input
            type="text"
            name="referral"
            className={css.input}
            value={formData.referral}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={css.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;
