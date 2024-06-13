import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

function SelectBox({
  name,
  options,
  value,
  placeholder,
  handleChange,
  label,
  className
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#f2f6f8', // Mengatur warna latar belakang
      border: state.isFocused ? '1px solid #4D17E2' : '1px solid #ced4da', // Mengatur border
      borderRadius: '0.5rem', // Mengatur border radius
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#838788', // Mengatur warna teks placeholder
    }),
  };

  return (
    <Form.Group>
      {label && <Form.Label className="label">{label}</Form.Label>}
      <Select
        name={name}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
        value={value}
        styles={customStyles}
        className={className}
      />
    </Form.Group>
  );
}

export default SelectBox;
