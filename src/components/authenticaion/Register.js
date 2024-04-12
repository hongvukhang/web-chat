import React, { useState } from "react";
import Authentication from "./Authentication";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { display } from "../../redux/showAlertSlice";
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
  const dispatch = useDispatch();
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
    if (dataLogin.password.length < 8) {
      dispatch(
        display({
          message: "The password must be longer than 8 characters",
          severity: "error",
          close: { title: "close" },
        })
      );
      return false;
    }
    if (dataLogin.confirmPassword !== dataLogin.password) {
      dispatch(
        display({
          message: "The confirmation password does not match the password",
          severity: "error",
          close: { title: "close" },
        })
      );
      return false;
    }
    if (dataLogin.email === "") return false;
    if (dataLogin.otp === "") return false;
    return true;
  };

  const registerHandler = (e) => {
    e.preventDefault();

    const isVal = validate();
    console.log(isVal);
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
          if (result.status === 201) {
            // naviagte("/login");
            dispatch(
              display({
                message: "The account has been successfully registered",
                severity: "success",
                close: {
                  title: "navigate",
                  payload: "/login",
                },
              })
            );
          }
        })
        .catch((err) => {
          dispatch(
            display({
              message: err?.response?.data?.msg,
              severity: "error",
              close: { title: "close" },
            })
          );
          if (err?.response?.status === 480) {
            setErr(err?.response?.data?.title);
          } else {
            setErr(err?.response?.data?.title + `+${Math.random()}`);
          }
        });
    } else {
      console.log("khong hop le");
    }
  };

  const sendOTPHandler = () => {
    if (!dataLogin.email) return;
    axios
      .post("/email/send-otp-register", {
        email: dataLogin.email,
        userName: dataLogin.username,
      })
      .then((res) => {
        setIsEmail(true);
      })
      .catch((err) => {
        dispatch(
          display({
            message: err?.response?.data?.msg,
            severity: "error",
            close: { title: "close" },
          })
        );
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
