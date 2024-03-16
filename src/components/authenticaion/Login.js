import React, { useState } from "react";
import axios from "axios";
import Authentication from "./Authentication";
import classes from "./authentication.module.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [cookies, setCookie] = useCookies(["auth"]);
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [className, setClassName] = useState();
  const changeData = (e) => {
    if (e.target.type === "text") {
      setDataLogin((dataLogin) => ({ ...dataLogin, username: e.target.value }));
    }
    if (e.target.type === "password") {
      setDataLogin((dataLogin) => ({ ...dataLogin, password: e.target.value }));
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        userName: dataLogin.username,
        password: dataLogin.password,
      })
      .then((res) => {
        setCookie("auth", res.data.token);
        setCookie("userName", res.data.userName);
        setCookie("name", res.data.name);
        setCookie("avatar", res.data.avatar);
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setClassName(classes["label"]);
        setErr(err?.response?.data?.msg + `+${Math.random()}`);
      });
  };
  return (
    <Authentication
      changeData={changeData}
      submitHandler={loginHandler}
      err={err}
    />
  );
}
