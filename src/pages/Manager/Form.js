import React, { useState } from "react";
import { Button, Col, Figure, Form, Row } from "react-bootstrap";
import { putData } from "../../utils/fetch";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import FormReject from "./FormRejected";
import Swal from "sweetalert2";
import { fetchOrders } from "../../redux/order/actions";
import { useDispatch } from "react-redux";
import { config } from "../../configs";

function FormManager({ form }) {
  const [FormRejected, setFormRejected] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form2, setForm2] = useState({
    alasanReject: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormRejectedClick = () => {
    setForm2({
      alasanReject: "",
    });
    setFormRejected((prevVisible) => !prevVisible);
  };

  const closePopup = () => {
    setForm2({
      alasanReject: "",
    });
    setFormRejected(false);
  };

  const handleChange = (e) => {
    setForm2({ ...form2, [e.target.name]: e.target.value });
  };

  const handleApprove = (id, status) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Ubah Status",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusPengajuan: status === "Approve" ? "Pending" : "Approve",
        };
        try {
          const res = await putData(`/approve/${id}`, payload);
          if (res?.data?.data) {
            toast.success("Berhasil ubah status order item");
            dispatch(fetchOrders());
            navigate("/manager");
          } else {
            toast.error("Gagal mengubah status order item");
          }
        } catch (error) {
          toast.error("Terjadi kesalahan. Silakan coba lagi.");
        }
      }
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      alasanReject: form2.alasanReject,
    };

    try {
      const res = await putData(`/reject/${id}`, payload);
      if (res?.data?.data) {
        toast.success(`Berhasil ubah status order item`);
        navigate("/manager");
      } else {
        toast.error(res.response.data.msg);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form method="post" className="form-create-event">
      <Form.Label className="label">Struk Pembayaran</Form.Label>
      {form.avatar && form.avatar !== "" ? (
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
            name="userRequestId"
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

      <Row className="text-center mb-5 mt-4 justify-content-center">
        <div className="d-grid gap-4 d-md-block">
          <button
            id="approve"
            href="#!"
            className="btn btn-success me-md-3"
            type="button"
            onClick={() => handleApprove(id, "Approve")}
          >
            Approve
          </button>
          <button
            id="reject"
            href="#!"
            className="btn btn-danger"
            type="button"
            onClick={handleFormRejectedClick}
          >
            Reject
          </button>
        </div>
      </Row>

      {FormRejected && (
        <div
          id="rejectForm"
          className="popupRejected"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            zIndex: 1000,
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Button
            variant="link"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "black",
            }}
            onClick={closePopup}
          >
            <FaTimes />
          </Button>
          <FormReject
            form2={form2}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </Form>
  );
}

export default FormManager;
