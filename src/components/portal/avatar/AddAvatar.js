import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./AddAvatar.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { useCookies } from "react-cookie";

import { useDispatch } from "react-redux";
import { display } from "../../../redux/showAlertSlice";

export default function AddAvatar({ handler, getAvatar }) {
  const [cookie, setCookie] = useCookies(["avatar"]);
  const [avatar, setAvatar] = useState("");
  const [avatarData, setAvatarData] = useState({
    current: "",
    list: [],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/get-avatar")
      .then((res) => {
        const list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          if (list[i] === res.data.avatar) {
            [list[0], list[i]] = [list[i], list[0]];
            break;
          }
        }
        setAvatarData({
          current: res.data.avatar,
          list: list,
        });
        setAvatar(res.data.avatar);
      })
      .catch((err) => {});
  }, []);
  const submitHandler = () => {
    if (!avatar) return false;
    const form = new FormData();
    if (typeof avatar === "string") form.append("avatar", avatar);
    else form.append(avatar[0].name, avatar[0]);

    axios
      .post("/save-avatar", form)
      .then((res) => {
        setAvatar(res.data.avatar);
        setAvatarData({ ...avatarData, list: res.data.listAvatar });
        dispatch(
          display({
            message: res.data.msg,
            severity: "success",
            close: { title: "close" },
          })
        );
        setCookie("avatar", res.data.avatar);
        getAvatar(res.data.avatar);
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
  return ReactDOM.createPortal(
    <div className={classes.container}>
      <div className={classes.content}>
        <label className={classes["btn"]} htmlFor="avatar">
          + Tải ảnh lên
        </label>
        <input
          onChange={(e) => {
            setAvatar([...e.target.files]);
          }}
          type="file"
          style={{ display: "none" }}
          id="avatar"
        />
        <p>Ảnh đã được tải </p>
        <ul className={classes["list-avatar"]}>
          {avatarData.list.map((item) => {
            const classActive = avatar === item ? classes.active : classes.none;
            return (
              <li
                key={item}
                className={classActive}
                onClick={() => setAvatar(item)}
                onError={(e) => {
                  setTimeout(() => {
                    e.target.src = item;
                  }, 500);
                }}
              >
                <img src={item} alt={item} />
                <div></div>
              </li>
            );
          })}
        </ul>

        <button
          onClick={submitHandler}
          className={`${classes.btn} ${classes.submit}`}
        >
          Submit
        </button>
        <IoIosCloseCircle
          onClick={() => {
            handler();
          }}
        />
      </div>
    </div>,
    document.querySelector("body")
  );
}
