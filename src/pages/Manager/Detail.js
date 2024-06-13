import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { Card } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/fetch";
import FormManager from "./Form";

function DetailFormManager() {
  const { id } = useParams();
  const [form, setForm] = useState({
    avatar: "",
    userRequestId: "",
    namaBarang: "",
    groupId: "",
    harga: "",
    jumlahOrder: "",
    keterangan: "",
  });
  

  const fetchOneOrder = async () => {
    const res = await getData(`/order/${id}`);
    const avatarName = res.data.data.Image?.name || null;

    setForm({
      ...form,
      avatar: avatarName,
      userRequestId: res.data.data.User.name,
      namaBarang: res.data.data.namaBarang,
      groupId: res.data.data.Group.name,
      harga: res.data.data.harga,
      jumlahOrder: res.data.data.jumlahOrder,
      keterangan: res.data.data.keterangan,
    });
  };

  useEffect(() => {
    fetchOneOrder();
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="Event"
        style={{
          minHeight: "100vh",
          paddingTop: "60px",
          paddingBottom: "30px",
        }}
      >
        <Card
          className="card-event"
          style={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
        >
          <h1 className="title text-center mt-4">Item Order</h1>
          <div className="border-top border-gray-200 pt-4 mt-4">
            <FormManager form={form} />
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default DetailFormManager;
