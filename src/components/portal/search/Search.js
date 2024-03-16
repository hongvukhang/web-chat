import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Search.module.css";
export default function Search({ closeHandler }) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const searchRef = useRef();
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
            <li
              onClick={() => sendMessage(user.idUser)}
              key={user.idUser}
              className={classes["item-search"]}
            >
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : window.location.origin + "/images/avatar.png"
                }
                alt="avatar"
              />
              <h3>{user.userName}</h3>
            </li>
          );
        })}
      </ul>
    </main>,
    document.querySelector("body")
  );
}
