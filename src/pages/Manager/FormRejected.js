import React from "react";
import { Form } from "react-bootstrap";
import SButton from "../../components/partikel/Button";

function FormReject({ form2, handleChange, handleSubmit, isLoading }) {
  return (
    <>
      <h1 className="title text-4xl text-center color-palette-1 mb-10">
        Alasan Ditolak
      </h1>
      <Form.Control
        name="alasanReject"
        as={"textarea"}
        rows={2}
        className="form-control mb-4"
        type="text"
        value={form2.alasanReject}
        onChange={handleChange}
      />
      <div className="text-center">
        <SButton
          className="btn-createEvent rounded-5"
          loading={isLoading}
          disabled={isLoading}
          action={handleSubmit}
          style={{ width: "100%" }}
        >
          Submit
        </SButton>
      </div>
    </>
  );
}

export default FormReject;
