import React from "react";
import SButton from "../../components/partikel/Button";
import SelectBox from "../../components/partikel/SelectBox";
import { Col, Form, Row } from "react-bootstrap";

function ItemsOrderForm({
  form,
  user,
  lists,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  return (
    <Form method="post" className="form-create-event">
      <Row className="mt-4 d-flex flex-wrap">
        <Col className="mb-3 flex-column">
          <Form.Label className="label">Pengaju</Form.Label>
          <Form.Control
            name="name"
            value={user}
            type="text"
            onChange={handleChange}
          />
        </Col>

        <Col className="mb-3 flex-column">
          <Form.Label className="label">Nama Barang</Form.Label>
          <Form.Control
            name="namaBarang"
            value={form.namaBarang}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mt-4 d-flex flex-wrap">
        <Col className="mb-3 flex-column">
          <Form.Label className="label">Harga</Form.Label>
          <Form.Control
            name="harga"
            value={form.harga}
            type="text"
            onChange={handleChange}
          />
        </Col>

        <Col className="mb-3 flex-column">
          <Form.Label className="label">Jumlah Order</Form.Label>
          <Form.Control
            name="jumlahOrder"
            value={form.jumlahOrder}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="label">keterangan</Form.Label>
        <Form.Control
          id="keterangan"
          as="textarea"
          name="keterangan"
          rows={3}
          value={form.keterangan}
          onChange={handleChange}
        />
      </Form.Group>

      <Col className="mb-3 flex-column">
          <SelectBox
            label={"Tempat Pengiriman"}
            placeholder={"Tempat Pengiriman"}
            className="text-md"
            name="groupId"
            isClearable={true}
            value={form.groupId}
            options={lists.groups}
            handleChange={handleChange}
          />
        </Col>

      <div className="text-center mb-5 mt-4">
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
    </Form>
  );
}

export default ItemsOrderForm;
