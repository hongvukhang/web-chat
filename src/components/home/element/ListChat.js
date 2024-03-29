import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "../Home.module.css";
import Item from "../../element/Item";
export default function ListChat({ reload, reloadSend, className }) {
  const [msgs, setMsgs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/chat-list")
      .then((res) => {
        setMsgs(res.data);
      })
      .catch((err) => {
        navigate("/login");
      });
  }, [reload, reloadSend]);
  return (
    <main className={`${classes["list-chat_container"]} ${classes[className]}`}>
      <h1>Messages</h1>
      <ul className={classes["list-chat"]}>
        {msgs.map((li) => {
          return <Item key={li._id} data={li} />;
        })}
      </ul>
    </main>
  );
}
