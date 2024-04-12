import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from "../Home.module.css";
import Item from "../../element/Item";
import useSound from "use-sound";

import boopSfx from "../../../sound/sound.mp3";
import { isShow } from "../../../redux/showCreateGroup";

export default function ListChat({ reload, reloadSend, className }) {
  const dispatch = useDispatch();
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

  const [play] = useSound(boopSfx);
  useEffect(() => {
    play();
  }, [reload]);
  return (
    <main className={`${classes["list-chat_container"]} ${classes[className]}`}>
      <div className={classes["list-title"]}>
        <h1>Messages</h1>
        <button onClick={() => dispatch(isShow(true))}>Create Group</button>
      </div>
      <ul className={classes["list-chat"]}>
        {msgs.map((li) => {
          return <Item key={li._id} data={li} />;
        })}
      </ul>
    </main>
  );
}
