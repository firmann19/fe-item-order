import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { Card } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData, putData } from "../../utils/fetch";
import { toast } from "react-toastify";
import FormFinance from "./Form";

function DetailFormFinance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/image", formData, true);
    return res;
  };

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

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          toast.error("Please select image size less than 3 MB");
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          try {
            const res = await uploadImage(e.target.files[0]);
            setForm({
              ...form,
              file: res.data.data.id,
              [e.target.name]: res.data.data.name,
            });
            toast.success("Image uploaded successfully");
          } catch (error) {
            toast.error("Failed to upload image. Please try again.");
          }
        }
      } else {
        toast.error("Type image png | jpg | jpeg");
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      imageId: form.file,
    };

    try {
      const res = await putData(`/order/${id}`, payload);
      if (res?.data?.data) {
        toast.success(`Berhasil tambah struk pembayaran`);
        navigate("/finance");
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
            <FormFinance
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default DetailFormFinance;
