import React, { useState } from "react";
import axios from "axios";
import Authentication from "./Authentication";
import classes from "./authentication.module.css";
import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import { useDispatch } from "react-redux";
import { display } from "../../redux/showAlertSlice";

export default function Login() {
  const [cookies, setCookie] = useCookies(["auth"]);
  const navigate = useNavigateCustom();
  const [dataLogin, setDataLogin] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [className, setClassName] = useState();
  const dispatch = useDispatch();

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
        // useNavigateCustom("/");
      })
      .catch((err) => {
        dispatch(
          display({
            message: err?.response?.data?.msg,
            severity: "error",
            close: { title: "close" },
          })
        );
        setClassName(classes["label"]);
        setErr(err?.response?.data?.title + `+${Math.random()}`);
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
