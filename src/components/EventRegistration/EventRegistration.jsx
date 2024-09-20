import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerForEvent } from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./EventRegistration.module.css";

const EventRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          dateOfBirth: new Date(),
          referral: "",
        }}
        validate={(values) => {
          const errors = {};

          // Full Name validation
          if (!values.fullName) {
            errors.fullName = "Full name is required";
          } else if (values.fullName.length > 50) {
            errors.fullName = "Full name cannot be more than 50 characters";
          }

          // Email validation
          if (!values.email) {
            errors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email format";
          }

          // Date of Birth validation
          if (!values.dateOfBirth) {
            errors.dateOfBirth = "Date of birth is required";
          } else if (new Date(values.dateOfBirth) > new Date()) {
            errors.dateOfBirth = "Date of birth cannot be in the future";
          }

          // Referral validation (optional, max length check)
          if (values.referral.length > 100) {
            errors.referral =
              "Referral information cannot exceed 100 characters";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await registerForEvent(id, values);
          navigate("/");
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <h1>Register for Event</h1>

            {/* Full Name Field */}
            <div className={css.formGroup}>
              <label className={css.label}>Full Name:</label>
              <Field type="text" name="fullName" className={css.input} />
              <ErrorMessage
                name="fullName"
                component="div"
                className={css.error}
              />
            </div>

            {/* Email Field */}
            <div className={css.formGroup}>
              <label className={css.label}>Email:</label>
              <Field type="email" name="email" className={css.input} />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            {/* Date of Birth Field with DatePicker */}
            <div className={css.formGroup}>
              <label className={css.label}>Date of Birth:</label>
              <DatePicker
                selected={values.dateOfBirth}
                onChange={(date) => setFieldValue("dateOfBirth", date)}
                maxDate={new Date()}
                className={css.input}
                dateFormat="yyyy-MM-dd"
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label className={css.label}>
                Where did you hear about this event?
              </label>
              <Field type="text" name="referral" className={css.input} />
              <ErrorMessage
                name="referral"
                component="div"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              className={css.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventRegistration;
