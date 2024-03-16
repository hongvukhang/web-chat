import React, { useState } from "react";
import Authentication from "./Authentication";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const naviagte = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    otp: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const [err, setErr] = useState("");

  const changeData = (e) => {
    if (e.target.type === "text") {
      setDataLogin((dataLogin) => ({
        ...dataLogin,
        username: e.target.value,
      }));
    }
    if (e.target.id === "Password") {
      setDataLogin((dataLogin) => ({
        ...dataLogin,
        password: e.target.value,
      }));
    }
    if (e.target.id === "Confirm password") {
      setDataLogin((dataLogin) => ({
        ...dataLogin,
        confirmPassword: e.target.value,
      }));
    }
    if (e.target.type === "email") {
      setDataLogin((dataLogin) => ({
        ...dataLogin,
        email: e.target.value,
      }));
    }
    if (e.target.type === "number") {
      setDataLogin((dataLogin) => ({
        ...dataLogin,
        otp: e.target.value,
      }));
    }
  };

  const validate = () => {
    if (dataLogin.username === "") return false;
    if (dataLogin.password.length < 6) return false;
    if (
      dataLogin.confirmPassword.length < 6 ||
      dataLogin.confirmPassword !== dataLogin.password
    )
      return false;
    if (dataLogin.email === "") return false;
    if (dataLogin.otp === "") return false;
    return true;
  };

  const registerHandler = (e) => {
    e.preventDefault();

    const isVal = validate();
    if (isVal) {
      const form = new FormData();
      avatar.forEach((file) => {
        form.append(file.name, file);
      });

      form.append("userName", dataLogin.username);
      form.append("password", dataLogin.password);
      form.append("comfirmPassword", dataLogin.confirmPassword);
      form.append("email", dataLogin.email);
      form.append("otp", dataLogin.otp);

      axios
        .post("/register", form)
        .then((result) => {
          console.log(result);
          if (result.status === 201) {
            naviagte("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 480) {
            setErr(err?.response?.data?.msg);
          } else {
            setErr(err?.response?.data?.msg + `+${Math.random()}`);
          }
        });
    } else {
      console.log("khong hop le");
    }
  };

  const sendOTPHandler = () => {
    if (!dataLogin.email) return;
    axios.post("/email/send-otp", { email: dataLogin.email }).then((res) => {
      setIsEmail(true);
    });
    setTimeout(() => {
      setIsEmail(false);
    }, 120000);
  };

  return (
    <Authentication
      changeData={changeData}
      submitHandler={registerHandler}
      avatar={setAvatar}
      sendOTPHandler={sendOTPHandler}
      isEmail={isEmail}
      err={err}
    />
  );
}
