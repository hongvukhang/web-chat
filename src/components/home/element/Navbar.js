import { useState, useEffect } from "react";
import classes from "../Home.module.css";
import Search from "../../portal/search/Search";

import { useCookies } from "react-cookie";

import { IoIosSearch } from "react-icons/io";
import { CiChat1, CiSettings, CiLogout } from "react-icons/ci";
import { FaHome, FaUserFriends } from "react-icons/fa";
import useNavigateCustom from "../../../hooks/useNavigateCustom";
import { useDispatch } from "react-redux";
import { notDisplay } from "../../../redux/showAlertSlice";
import { useNavigate } from "react-router-dom";
export default function Navbar({ socket }) {
  const navigate = useNavigateCustom();
  const navigateDefault = useNavigate();
  const dispatch = useDispatch();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  useEffect(() => {
    if (!cookies) {
      return navigate("/login");
    }
  }, [cookies]);

  //logout handler
  const logoutHandler = () => {
    socket.disconnect();
    removeCookie("auth");
    removeCookie("userName");
    navigate("/login");
  };
  const closeSearchHandler = () => {
    setToggleSearch(false);
  };
  return (
    <>
      <nav className={classes.navbar}>
        <div></div>
        <div className={classes["main-navbar"]}>
          <FaHome onClick={() => navigate("/")} />
          <FaUserFriends
            onClick={() => {
              navigate("/friends", { state: { key: "Friends" } });
            }}
          />
          <IoIosSearch
            onClick={() => {
              dispatch(notDisplay());
              setToggleSearch((toggle) => !toggle);
            }}
          />
          <CiSettings onClick={() => navigate("/setting")} />
        </div>
        <CiLogout onClick={logoutHandler} />
      </nav>
      {toggleSearch && (
        <Search closeHandler={closeSearchHandler} socket={socket} />
      )}
    </>
  );
}
