import React from "react";

const Input = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm mb-2">{label}</label>
      <input
        type={type}
        name={name}
        className={`appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${label === "Password" ? " w-72" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;
