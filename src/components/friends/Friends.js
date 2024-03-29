import { useEffect, useState } from "react";
import classes from "./Friends.module.css";
import Navbar from "../home/element/Navbar";
import style from "../home/Home.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { display } from "../../redux/showAlertSlice";

import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
export default function Friends({ socket }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [cookies] = useCookies(["auth"]);
  const dispath = useDispatch();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState(
    location.state.key ? location.state.key : "Friends"
  );
  const [dataShow, setDataShow] = useState([]);
  const [reload, setReload] = useState({ title: "reload" });
  useEffect(() => {
    axios
      .get("/friends")
      .then((res) => {
        setData(res.data);
        const dt = res.data.filter(
          (user) => user.status === location.state.key.toLowerCase()
        );
        if (reload.status) {
          setFilterData(location.state.key ? location.state.key : "Friends");
        }
        setDataShow(dt);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload, location]);

  const filterHandler = (e, fK) => {
    const filterKey = fK ? fK : e.target.innerHTML;
    setFilterData(filterKey);
    const dt = data.filter((user) => user.status === filterKey.toLowerCase());
    setDataShow(dt);
  };

  const refuseData = (_id) => {
    const dtShow = data.filter(
      (user) => user.status === filterData.toLowerCase() && user._id !== _id
    );
    const dt = data.filter((user) => user._id !== _id);
    setDataShow(dtShow);
    setData(dt);
  };
  const accessFriend = (_id) => {
    axios
      .post("/add-friend-access", { _id: _id })
      .then((res) => {
        // refuseData(_id);
        // filterHandler(null, "Friends");
        setReload({ title: "Friends", status: false });
        setFilterData("Friends");
        dispath(
          display({
            severity: "success",
            message: res.data.msg,
            close: { title: "close" },
          })
        );
      })
      .catch((err) => {
        dispath(
          display({
            severity: "error",
            message: err.response?.data.msg,
            close: { title: "close" },
          })
        );
      });
  };
  const refuseFriend = (_id) => {
    axios
      .post("/add-friend-refuse", { _id: _id })
      .then((res) => {
        // refuseData(_id);
        setReload({ title: "reload" });
        dispath(
          display({
            severity: "success",
            message: res.data.msg,
            close: { title: "close" },
          })
        );
      })
      .catch((err) => {
        dispath(
          display({
            severity: "error",
            message: err.response?.data.msg,
            close: { title: "close" },
          })
        );
      });
  };
  const deleteFriend = (_id) => {
    axios
      .post("/delete-friend", { _id: _id })
      .then((res) => {
        setReload({ title: "reload" });
        dispath(
          display({
            severity: "success",
            message: res.data.msg,
            close: { title: "close" },
          })
        );
      })
      .catch((err) => {
        dispath(
          display({
            severity: "error",
            message: err.response?.data.msg,
            close: { title: "close" },
          })
        );
      });
  };
  return (
    <div className={style["home-container"]}>
      <Navbar socket={socket} />
      <main className={style["chat-container"]}>
        <div className={classes["lf-container"]}>
          <h1>List Friends</h1>
          <input type="text" placeholder="User Name" />
          <div className={classes["lf-filter"]}>
            <button
              onClick={(e) => {
                filterHandler(e);
                // navigate(`/friends/${e.target.innerHTML}`);
              }}
              className={
                filterData === "Friends"
                  ? `${classes.btn} ${classes["btn-active"]}`
                  : classes.btn
              }
            >
              Friends
            </button>
            <button
              onClick={(e) => {
                filterHandler(e);
                // navigate(`/friends/${e.target.innerHTML}`);
              }}
              className={
                filterData === "Waiting"
                  ? `${classes.btn} ${classes["btn-active"]}`
                  : classes.btn
              }
            >
              Waiting
            </button>
            <button
              onClick={(e) => {
                filterHandler(e);
                // navigate(`/friends/${e.target.innerHTML}`);
              }}
              className={
                filterData === "Request"
                  ? `${classes.btn} ${classes["btn-active"]}`
                  : classes.btn
              }
            >
              Request
            </button>
          </div>
          <ul style={{ padding: 0 }} className={style["list-chat"]}>
            {dataShow.map((user) => {
              return (
                <li
                  key={user._id}
                  style={{
                    padding: "1rem 1.25rem",
                    cursor: "pointer",
                  }}
                  className={`${style["chat-item"]} ${classes["item"]}`}
                >
                  <div className={style["img-container"]}>
                    <img src={user.avatar} alt="avartar" />
                  </div>
                  <div className={style["item-user"]}>
                    <h3 style={{ fontSize: "1rem" }}>{user.name}</h3>
                    {filterData === "Request" && (
                      <div className={classes["btn-container"]}>
                        <button onClick={() => accessFriend(user._id)}>
                          Accept
                        </button>
                        <button onClick={() => refuseFriend(user._id)}>
                          Refuse
                        </button>
                      </div>
                    )}
                  </div>
                  {filterData === "Friends" && (
                    <MdDeleteForever
                      className={classes.delete}
                      onClick={() => {
                        deleteFriend(user._id);
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`${style["box-chat"]} ${
            (location.pathname === "/" || location.pathname === "/friends") &&
            style.none
          }`}
        >
          <img src={cookies.avatar} alt="avatar" />
          <h3>Hey, {cookies.name}</h3>
          <p>Please select a friend to start messaging.</p>
        </div>
      </main>
    </div>
  );
}
