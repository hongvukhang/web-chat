import { useState, useRef } from "react";
import classes from "../Setting.module.css";
import axios from "axios";
export default function ChangePassword() {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [error, setError] = useState({
    oldPass: false,
    newPass: false,
  });
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const [success, setSucess] = useState(false);
  const changePasswordHandler = (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    if (newPassword < 8) return setError({ ...error, newPass: true });
    const dataRequest = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    axios
      .post("/change-password", dataRequest)
      .then((res) => {
        setSucess(true);
        setError({ oldPass: false, newPass: false });
      })
      .catch((err) => {
        setError({ oldPass: true, newPass: true });
      });
  };
  return (
    <>
      <li
        onClick={() => setIsChangePassword((is) => !is)}
        className={classes["setting-item"]}
      >
        Change Password
      </li>
      {isChangePassword && (
        <form
          onSubmit={changePasswordHandler}
          className={classes["form-password"]}
        >
          <input
            onFocus={() => {
              setError({ ...error, oldPass: false });
            }}
            className={
              error.oldPass
                ? `${classes["form-password_input"]} ${classes["input-error"]}`
                : classes["form-password_input"]
            }
            type="password"
            placeholder="Old password"
            ref={oldPasswordRef}
            required
          />
          <input
            onFocus={() => {
              setError({ ...error, newPass: false });
            }}
            className={
              error.newPass
                ? `${classes["form-password_input"]} ${classes["input-error"]}`
                : classes["form-password_input"]
            }
            type="password"
            placeholder="New password"
            ref={newPasswordRef}
            required
          />
          <button className={classes["form-password_btn"]}>
            Submit Password
          </button>
          {success && (
            <span style={{ fontSize: "13px" }}>Change password success</span>
          )}
        </form>
      )}
    </>
  );
}
