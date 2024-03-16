import React, { useState } from "react";
import AddAvatar from "../../../portal/avatar/AddAvatar";
import classes from "../../Setting.module.css";
import { useCookies } from "react-cookie";
export default function ChangeAvatar() {
  const [cookies] = useCookies(["auth"]);
  const [isAddAvatar, setIsAddAvatar] = useState(false);
  const [avatar, setAvatar] = useState(cookies.avatar);
  const closeHandler = () => {
    setIsAddAvatar(false);
  };
  const getAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };
  return (
    <>
      <p>Avatar</p>
      <label
        className={classes["input-avatar"]}
        onClick={() => setIsAddAvatar(true)}
      >
        <img
          src={avatar}
          onError={(e) => {
            setTimeout(() => {
              e.target.src = avatar;
            }, 500);
          }}
          alt="avatar"
        />
        <p>You can upload jpg, gif or png files. </p>
      </label>
      {isAddAvatar && (
        <AddAvatar handler={closeHandler} getAvatar={getAvatar} />
      )}
    </>
  );
}
