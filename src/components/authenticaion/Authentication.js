import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import Input from "./Input";
// import Layout from "./Layout";
import classes from "./authentication.module.css";
export function Layout(props) {
  return (
    <main className={classes.container}>
      <main className={classes["login-container"]}>{props.children}</main>
    </main>
  );
}
export function FormData(props) {
  return (
    <form onSubmit={props.submitHandler} className={classes["form-login"]}>
      {props.children}
    </form>
  );
}
export default function Authentication({
  changeData,
  submitHandler,
  avatar,
  err,
  sendOTPHandler,
  isEmail,
}) {
  const navigate = useNavigateCustom();
  const location = useLocation();

  return (
    <Layout>
      <span></span>
      <form onSubmit={submitHandler} className={classes["form-login"]}>
        <Input
          changeData={changeData}
          title={"User Name"}
          type={"text"}
          err={err}
        />

        <Input
          changeData={changeData}
          title={"Password"}
          type={"password"}
          err={err}
        />
        {location.pathname === "/register" && (
          <Input
            changeData={changeData}
            title={"Confirm password"}
            type={"password"}
          />
        )}
        {location.pathname === "/register" && (
          <Input changeData={changeData} title={"Email"} type={"email"} />
        )}
        {location.pathname === "/register" && (
          <div className={classes["upload-avatar"]}>
            <input
              type="file"
              id="avatar"
              onChange={(e) => {
                avatar([...e.target.files]);
              }}
              required
            />
            <label htmlFor="avatar">Upload Avatar</label>
          </div>
        )}
        {location.pathname === "/register" && (
          <div className={classes["input-otp"]}>
            <input
              className={err === "otp" && classes.error}
              onChange={(e) => changeData(e)}
              type="number"
              required
            />
            {!isEmail && <span onClick={() => sendOTPHandler()}>Send OTP</span>}
            {isEmail && (
              <span style={{ color: "#e14d4d", fontSize: "13px" }}>
                Check Email
              </span>
            )}
          </div>
        )}
        <button className={classes["btn-submit"]}>
          {location.pathname === "/login" ? "LOG IN" : "REGISTER"}
        </button>
      </form>
      <button
        className={classes.reqRegister}
        onClick={
          location.pathname === "/login"
            ? () => navigate("/register")
            : () => navigate("/login")
        }
      >
        {location.pathname === "/login" ? "Register ?" : "Login"}
      </button>
      {location.pathname === "/login" && (
        <span
          onClick={() => navigate("/forgot-password")}
          className={classes["forgot"]}
        >
          Forgot password?
        </span>
      )}
    </Layout>
  );
}
