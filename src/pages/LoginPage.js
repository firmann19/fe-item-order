import React, { useState } from "react";
import Logo from "../assets/images/mery-icon.png";
import LoginInput from "../components/LoginInput";
import ImgLogin from "../assets/images/items-order.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux/auth/actions";
import { postData } from "../utils/fetch";
import { toast } from "react-toastify";

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData("/login", form);
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.user,
          res.data.data.userId,
          res.data.data.role,
          res.data.data.getAllApprove,
          res.data.data.getAllReject
        )
      );

      toast.success("Login successful!");
      setIsLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.response?.data?.msg ?? "Internal Server Error");
    }
  };

  return (
    <section className="sign-in mx-auto">
      <div className="row">
        <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
          <div className="container mx-auto">
            <div className="pb-30">
              <a class="navbar-brand" href="../index.html">
                <img src={Logo} width="80" height="80" />
              </a>
            </div>
            <h2 className="title fw-bold  color-palette-1 mb-10">Sign In</h2>
            <LoginInput
              form={form}
              isLoading={isLoading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        <div
          className="col-xxl-7 col-lg-6 text-center pt-lg-145 pb-lg-227 d-lg-block d-none"
          style={{ backgroundColor: "#1A1640" }}
        >
          <img
            src={ImgLogin}
            alt=""
            width="500px"
            height="500px"
            className="pb-50 img-fluid"
          />
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
