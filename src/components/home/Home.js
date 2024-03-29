import classes from "./Home.module.css";
import { useLocation } from "react-router-dom";

import Navbar from "./element/Navbar";
import ListChat from "./element/ListChat";
import { useCookies } from "react-cookie";

export function LayoutHome({ children, reload, socket }) {
  const location = useLocation();

  return (
    <div className={classes["home-container"]}>
      <Navbar socket={socket} />

      <main className={classes["chat-container"]}>
        <ListChat
          className={location.pathname !== "/" ? "none" : ""}
          reload={reload}
        />
        <div
          className={`${classes["box-chat"]} ${
            location.pathname === "/" && classes.none
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
export default function Home({ reload, socket }) {
  const [cookies] = useCookies(["name"]);
  return (
    <LayoutHome socket={socket} reload={reload}>
      <img src={cookies.avatar} alt="avatar" />
      <h3>Hey, {cookies.name}</h3>
      <p>Please select a chat to start messaging.</p>
    </LayoutHome>
  );
}
