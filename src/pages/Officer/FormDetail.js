import React from "react";
import { Col, Figure, Form, Row } from "react-bootstrap";
import { config } from "../../configs";
function FormDetail({ form }) {
  return (
    <Form method="post" className="form-create-event">
      <Form.Label className="label">Struk Pembayaran</Form.Label>
      {form.avatar &&form.avatar !== "" ? (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={`${config.api_image}/${form.avatar}`}
            />
          </Figure>
        </div>
      ) : (
        <div>Struk pembayaran belum ada</div>
      )}

      <Row className="mt-4 d-flex flex-wrap">
        <Col className="mb-3 flex-column">
          <Form.Label className="label">Pengaju</Form.Label>
          <Form.Control
            name="name"
            value={form.userRequestId}
            type="text"
            readOnly
            disabled
          />
        </Col>

        <Col className="mb-3 flex-column">
          <Form.Label className="label">Nama Barang</Form.Label>
          <Form.Control
            name="namaBarang"
            value={form.namaBarang}
            type="text"
            readOnly
            disabled
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
            readOnly
            disabled
          />
        </Col>

        <Col className="mb-3 flex-column">
          <Form.Label className="label">Jumlah Order</Form.Label>
          <Form.Control
            name="jumlahOrder"
            value={form.jumlahOrder}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="label">Keterangan</Form.Label>
        <Form.Control
          id="keterangan"
          as="textarea"
          name="keterangan"
          rows={3}
          value={form.keterangan}
          readOnly
          disabled
        />
      </Form.Group>

      <Row className="mt-4 d-flex flex-wrap">
        <Col className="mb-3 flex-column">
          <Form.Label className="label">Tempat Pengiriman</Form.Label>
          <Form.Control
            name="groupId"
            value={form.groupId}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>
    </Form>
  );
}

export default FormDetail;
