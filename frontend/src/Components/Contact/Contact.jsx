import React from "react";
import "./Contact.css";

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Contact Us</h2>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>

            <input type="text" id="name" name="name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>

            <input type="email" id="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>

            <textarea id="message" name="message"></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
