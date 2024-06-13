import React, { useEffect } from "react";
import Button from "../../components/partikel/Button";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Table from "../../components/partikel/TableWithAction";
import SearchInput from "../../components/partikel/SearchInput";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { fetchOrders } from "../../redux/order/actions";
import { putData } from "../../utils/fetch";

function Finance() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#06D001",
      confirmButtonText: "Approve",
      denyButtonText: "Reject",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusPengajuan: "Approve",
        };
        const res = await putData(`/approve/${id}`, payload);
        if (res?.data?.data) {
          toast.success(`Berhasil ubah status menjadi Approve`);
          dispatch(fetchOrders());
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: "Masukkan Alasan Reject",
          input: "text",
          inputPlaceholder: "Masukkan alasan di sini...",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: "Reject",
          cancelButtonText: "Batal",
          inputValidator: (value) => {
            if (!value) {
              return "Anda harus memasukkan alasan!";
            }
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            const payload = {
              statusPengajuan: "Reject",
              alasanReject: result.value,
            };
            const res = await putData(`/reject/${id}`, payload);
            if (res?.data?.data) {
              toast.success(`Berhasil ubah status menjadi Reject`);
              dispatch(fetchOrders());
            }
          }
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container
        className="grup mt-3"
        style={{ height: "80vh", padding: "30px" }}
      >
        <BreadCrumb textSecound={"Finance"} />
        <Row>
          <Col md="4">
            <SearchInput query={""} handleChange={""} />
          </Col>
        </Row>

        <Table
          status={orders.status}
          thead={[
            "Pengaju",
            "Nama Barang",
            "Harga",
            "Jumlah Order",
            "Status Pengajuan",
            "Aksi",
          ]}
          data={orders.data}
          tbody={[
            "User",
            "NamaBarang",
            "Harga",
            "JumlahOrder",
            "StatusPengajuan",
            "Aksi",
          ]}
          customAction={(id, statusPengajuan = "") => {
            return (
              <Button
                className={"mx-2"}
                size={"sm"}
                action={() => handleChangeStatus(id, statusPengajuan)}
              >
                Change Status
              </Button>
            );
          }}
          Detail={`/detail-form-finance`}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Finance;
