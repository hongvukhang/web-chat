import React from "react";
import classes from "../Setting.module.css";
import { CiUser } from "react-icons/ci";
import ChangeName from "./account/ChangeName";
import AddAvatar from "../../portal/avatar/AddAvatar";
import ChangeAvatar from "./account/ChangeAvatar";
export default function Account() {
  return (
    <>
      <div className={classes["setting-item"]}>
        <div className={classes["setting-item_title"]}>
          <div>
            <h3>Account</h3>
            <p>Update your account</p>
          </div>
          <div>
            <CiUser />
          </div>
        </div>
        <div className={classes["setting-item_content"]}>
          <ChangeAvatar />
          <ChangeName />
        </div>
      </div>
    </>
  );
}
