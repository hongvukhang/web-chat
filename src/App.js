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

import { useSelector } from "react-redux";

function App() {
  const [cookies] = useCookies(["auth"]);

  const alert = useSelector((state) => state.show_alert);

  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.auth}`;
  const [socketIO, setSocketIO] = useState();
  const [message, setMessage] = useState();
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
      socket.on("disconnectThatSoc", function () {
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
