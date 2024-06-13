import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Card } from "react-bootstrap";
import ItemsOrderForm from "./Form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { fetchListsGroup } from "../../redux/lists/actions";

function CreateOrderItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    userRequestId: "",
    namaBarang: "",
    groupId: "",
    harga: "",
    jumlahOrder: "",
    keterangan: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      let { user, userId } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setUserId(userId);
      setUser(user);
    };
    fetchData();
    dispatch(fetchListsGroup());
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "groupId") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      userRequestId: userId,
      namaBarang: form.namaBarang,
      harga: form.harga,
      jumlahOrder: form.jumlahOrder,
      groupId: form.groupId.value,
      keterangan: form.keterangan,
    };

    try {
      const res = await postData(`/order`, payload);
      if (res?.data?.data) {
        toast.success(`Berhasil create order ${res.data.data.namaBarang}`);
        navigate("/dashboard");
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
            <ItemsOrderForm
              user={user}
              form={form}
              isLoading={isLoading}
              lists={lists}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default CreateOrderItems;
