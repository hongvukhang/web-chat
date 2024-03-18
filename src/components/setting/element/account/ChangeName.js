import { useRef, useState } from "react";
import classes from "../../Setting.module.css";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { display } from "../../../../redux/showAlertSlice";
import axios from "axios";
export default function ChangeName() {
  const [cookies, setCookie] = useCookies(["name"]);
  const nameRef = useRef();
  const dispatch = useDispatch();

  const changeNameHandler = () => {
    const newName = nameRef.current.value;
    axios
      .post("/change-new-name", { newName: newName })
      .then((res) => {
        if (res.status === 200) {
          setCookie("name", newName);
          dispatch(
            display({
              message: res.data.msg,
              severity: "success",
              close: { title: "close" },
            })
          );
        }
      })
      .catch((err) => {
        dispatch(
          display({
            message: err?.response?.data.msg,
            severity: "error",
            close: { title: "close" },
          })
        );
      });
  };
  return (
    <>
      <p>Name</p>
      <input
        ref={nameRef}
        className={classes["input"]}
        type="text"
        placeholder="Type your name"
        defaultValue={cookies.name}
      />
      <button className={classes["btn"]} onClick={changeNameHandler}>
        Submit Name
      </button>
    </>
  );
}
