import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/partikel/Button";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Table from "../../components/partikel/TableWithAction";
import SearchInput from "../../components/partikel/SearchInput";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/order/actions";

function Officer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {

    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Container
        className="grup mt-3"
        style={{ height: "80vh", padding: "30px" }}
      >
        <Button
          className="btn me-3"
          action={() => navigate("/create-order-items")}
        >
          Beli Barang
        </Button>

        <BreadCrumb textSecound={"Officer"} />
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
          Detail={`/detail-form-officer`}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Officer;
