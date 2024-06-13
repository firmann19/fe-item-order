import React, { useEffect } from "react";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Table from "../../components/partikel/TableWithAction";
import SearchInput from "../../components/partikel/SearchInput";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../utils/fetch";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { fetchOrders } from "../../redux/order/actions";

function Manager() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/order/${id}`);
        if (res?.data?.data) {
          toast.success(`Berhasil hapus data`);
          dispatch(fetchOrders());
        } else {
          toast.error("Gagal menghapus data");
        }
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
        <BreadCrumb textSecound={"Manager"} />
        <Row>
          <Col md="4">
            <SearchInput query={""} handleChange={""} />
          </Col>
        </Row>

        <Table
          status={orders.status}
          thead={["Pengaju", "Nama Barang", "Harga", "Jumlah Order", "Status Pengajuan", "Aksi"]}
          data={orders.data}
          tbody={["User", "NamaBarang", "Harga", "JumlahOrder", "StatusPengajuan", "Aksi"]}
          Detail={`/detail-form-manager`}
          deleteAction={(e) => handleDelete(e)}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Manager;
