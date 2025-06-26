import React from "react";

export default function Dropdown({ value, onChange, categories }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {categories.map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
