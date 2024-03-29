import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { IoIosSearch, IoMdClose, IoMdPersonAdd } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Search.module.css";
import { useDispatch } from "react-redux";
import { display } from "../../../redux/showAlertSlice";
export default function Search({ closeHandler, socket }) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const searchRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("/get-admin").then((res) => {
      setUserList([res.data]);
    });
  }, []);
  const submitSearch = () => {
    const key_search = searchRef.current.value;
    if (key_search) {
      axios.get(`/search-user/${key_search}`).then((res) => {
        setUserList(res.data);
      });
    }
  };

  const sendMessage = (_id) => {
    axios.get(`/chat/send-message/${_id}`).then((res) => {
      navigate(`/chat/${res.data}`);
      closeHandler();
    });
  };

  const addFriend = (_id) => {
    axios
      .post("/add-friend", { _id: _id })
      .then((res) => {
        dispatch(
          display({
            severity: "success",
            message: res.data.msg,
            close: { title: "close" },
          })
        );
      })
      .catch((err) => {
        dispatch(
          display({
            severity: "error",
            message: err.response?.data.msg,
            close: { title: "close" },
          })
        );
      });
  };

  return ReactDOM.createPortal(
    <main className={classes["search-container"]}>
      <IoMdClose onClick={() => closeHandler()} />
      <div className={classes["search-bar"]}>
        <input
          className={classes["input-search"]}
          ref={searchRef}
          type="text"
          placeholder="User Name ..."
        />
        <button onClick={submitSearch} className={classes["btn-search"]}>
          <IoIosSearch />
        </button>
      </div>
      <ul className={classes["list-search"]}>
        {userList.map((user) => {
          return (
            <li key={user.idUser} className={classes["item-search"]}>
              <div onClick={() => sendMessage(user.idUser)}>
                <img
                  src={
                    user.avatar
                      ? user.avatar
                      : window.location.origin + "/images/avatar.png"
                  }
                  alt="avatar"
                />
                <h3>{user.userName}</h3>
              </div>
              <IoMdPersonAdd onClick={() => addFriend(user.idUser)} />
            </li>
          );
        })}
      </ul>
    </main>,
    document.querySelector("body")
  );
}
