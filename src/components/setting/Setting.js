import React from "react";
import classes from "./Setting.module.css";
import Account from "./element/Account";
import Security from "./element/Security";
import { LayoutHome } from "../home/Home";
export default function Setting({ reload, socket }) {
  return (
    <LayoutHome reload={reload} socket={socket}>
      <div className={classes["setting-title"]}>
        <h3>Setting</h3>
        <p>Update your profile details</p>
      </div>
      <div className={classes["setting-content"]}>
        <Account />
        <Security />
      </div>
    </LayoutHome>
  );
}
