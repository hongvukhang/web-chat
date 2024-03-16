import ReactDOM from "react-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import classes from "./Setting.module.css";
import ChangeAvatar from "./element/ChangeAvatar";
import ChangeName from "./element/ChangeName";
import ChangePassword from "./element/ChangePassword";
export default function Setting({ socket }) {
  const [cookies, setCookie, removeCookie] = useCookies(["auth", "userName"]);
  const navigate = useNavigate();

  //logout handler
  const logoutHandler = () => {
    socket.disconnect();

    removeCookie("auth");
    removeCookie("userName");
    navigate("/login");
  };
  return ReactDOM.createPortal(
    <ul className={classes["setting-container"]}>
      <ChangeName />
      <ChangeAvatar />
      <ChangePassword />
      <li
        onClick={logoutHandler}
        className={`${classes["setting-item"]} ${classes.logout}`}
      >
        Log Out
      </li>
    </ul>,
    document.querySelector("body")
  );
}
