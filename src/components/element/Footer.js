import React from "react";
import { IoMdHome, IoMdPeople } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import classes from "../home/Home.module.css";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className={classes.footer}>
      <button className={classes["btn"]} onClick={() => navigate("/")}>
        <IoMdHome />
      </button>
      <button className={classes["btn"]}>
        <IoMdPeople />
      </button>
    </footer>
  );
}
