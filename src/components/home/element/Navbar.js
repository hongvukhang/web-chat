import { useState, useEffect } from "react";
import classes from "../Home.module.css";
import Search from "../../portal/search/Search";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { IoIosSearch } from "react-icons/io";
import { CiChat1, CiSettings, CiLogout } from "react-icons/ci";
import { FaHome } from "react-icons/fa";

export default function Navbar({ socket }) {
  const navigate = useNavigate();
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
          <CiChat1 />
          <IoIosSearch onClick={() => setToggleSearch((toggle) => !toggle)} />
          <CiSettings onClick={() => navigate("/setting")} />
        </div>
        <CiLogout onClick={logoutHandler} />
      </nav>
      {toggleSearch && <Search closeHandler={closeSearchHandler} />}
    </>
  );
}
