import React from "react";
import "./About.css";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h1 className="text-2xl text-red-500">About Us</h1>
          <p>
            Welcome to Student Bazaar, the student-focused marketplace born in
            May 2022. With over 2000 students connected, our core mission is to
            offer essential items at affordable prices, easing the financial
            burden on students.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
