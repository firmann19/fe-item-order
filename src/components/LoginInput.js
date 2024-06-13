import React from "react";
import SButton from "../components/partikel/Button";
import { Form } from "react-bootstrap";

export default function SFORM({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <div className="pt-50">
        <Form.Label className="label">Email</Form.Label>
        <Form.Control
          name="email"
          value={form.email}
          type="text"
          onChange={handleChange}
          className="text-lg form-control rounded-5"
          placeholder="Masukan email"
        />
      </div>

      <div className="pt-30">
        <Form.Label className="label">Password</Form.Label>
        <Form.Control
          name="password"
          value={form.password}
          type="password"
          onChange={handleChange}
          className="text-lg form-control rounded-5"
          placeholder="Masukan password"
        />
      </div>

      <div className="button-group d-flex flex-column mx-auto pt-50">
        <SButton
          loading={isLoading}
          disabled={isLoading}
          variant="primary"
          className="btn btn-sign-in text-white rounded-5 p-2"
          action={handleSubmit}
        >
          Continue to Sign In
        </SButton>
      </div>
    </Form>
  );
}
