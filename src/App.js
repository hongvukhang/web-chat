import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import axios from "axios";

import { useCookies } from "react-cookie";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Alerts from "./components/portal/alert/Alert";

import Home from "./components/home/Home";
import ChatBox from "./components/chat/ChatBox";
import NotFound from "./components/404/NotFound";
import Setting from "./components/setting/Setting";
import Login from "./components/authenticaion/Login";
import Register from "./components/authenticaion/Register";
import ForgotPassword from "./components/authenticaion/forgotPassword/ForgotPassword";
import Friends from "./components/friends/Friends";
import CreateGroup from "./components/chat/element/createGroup/CreateGroup";
import { useSelector, useDispatch } from "react-redux";
import { display } from "./redux/showAlertSlice";
function App() {
  const [cookies] = useCookies(["auth"]);

  const alert = useSelector((state) => state.show_alert);
  const isGroup = useSelector((state) => state.show_group);

  const dispatch = useDispatch();

  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.auth}`;
  const [socketIO, setSocketIO] = useState();
  const [message, setMessage] = useState();
  const [notify, setNotify] = useState();
  useEffect(() => {
    if (cookies.userName) {
      const socket = io("http://localhost:5000", {
        query: {
          id: cookies.userName,
        },
      });
      setSocketIO(socket);
      socket.on("message", (arg) => {
        setMessage(arg);
      });
      socket.on("msg-image", (arg) => {
        setMessage(arg);
      });
      socket.on("notify", (arg) => {
        console.log(arg);
        dispatch(
          display({
            severity: "info",
            message: arg.msg,
            close: { title: "close" },
            actions: {
              pathname: "/friends",
              options: { state: { key: "Request" } },
            },
          })
        );
      });
      socket.on("disconnect", function () {
        socket.disconnect();
      });
    }
  }, [cookies]);

  return (
    <>
      <BrowserRouter>
        {alert.status && (
          <Alerts
            severity={alert.severity}
            msg={alert.message}
            actionHandler={alert.actions}
            close={alert.close}
          />
        )}
        {isGroup.isShow && <CreateGroup />}
        <Routes>
          <Route
            path="/"
            element={<Home reload={message} socket={socketIO} />}
          />
          <Route
            path="/setting"
            element={<Setting reload={message} socket={socketIO} />}
          />

          <Route path="*" element={<NotFound />} />
          <Route
            path="/chat/:id"
            element={<ChatBox socket={socketIO} message={message} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/friends"
            element={<Friends socket={socketIO} notify={notify} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
