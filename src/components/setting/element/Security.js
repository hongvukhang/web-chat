import { useRef, useState } from "react";

import axios from "axios";
import { IoShieldOutline } from "react-icons/io5";
import classes from "../Setting.module.css";
export default function Security() {
  const currPassRef = useRef();
  const newPassRef = useRef();
  const comfirmPassRef = useRef();

  const [error, setError] = useState({
    curr: false,
    new: false,
    comfirm: false,
  });

  const [success, setSucess] = useState(false);
  //validate password
  const validatePassword = (currPass, newPass, comfirmPass) => {
    if (!currPass) {
      setError({ ...error, curr: true });
      return false;
    }
    if (!newPass) {
      setError({ ...error, new: true });
      return false;
    }
    if (newPass.length < 6) {
      setError({ ...error, new: true });
      return false;
    }
    if (!comfirmPass) {
      setError({ ...error, comfirm: true });
      return false;
    }
    if (comfirmPass !== newPass) {
      setError({ ...error, comfirm: true });
      return false;
    }
    return true;
  };
  const changePasswordHandler = () => {
    const [currPass, newPass, comfirmPass] = [
      currPassRef.current.value,
      newPassRef.current.value,
      comfirmPassRef.current.value,
    ];
    const isVal = validatePassword(currPass, newPass, comfirmPass);
    if (isVal) {
      const dataRequest = {
        oldPassword: currPass,
        newPassword: newPass,
      };
      axios
        .post("/change-password", dataRequest)
        .then((res) => {
          setSucess(true);
        })
        .catch((err) => {
          if (err.response.data.msg === "old password")
            return setError({ ...error, curr: true });
          if (err.response.data.msg === "new password")
            return setError({ ...error, new: true });

          setError({ ...error, curr: true, new: true });
        });
    }
  };
  return (
    <div className={classes["setting-item"]}>
      <div className={classes["setting-item_title"]}>
        <div>
          <h3>Security</h3>
          <p>Update your password</p>
        </div>
        <div>
          <IoShieldOutline />
        </div>
      </div>
      <div className={classes["setting-item_content"]}>
        <p style={error.curr ? { color: "#ff0000b3" } : {}}>Current Password</p>
        <input
          className={classes.input}
          ref={currPassRef}
          onFocus={() => {
            setError({ ...error, curr: false });
          }}
          type="password"
          placeholder="Current Password"
        />
        <p style={error.new ? { color: "#ff0000b3" } : {}}>New Password</p>
        <input
          className={classes.input}
          ref={newPassRef}
          onFocus={() => {
            setError({ ...error, new: false });
          }}
          type="password"
          placeholder="New Password"
        />
        <p style={error.comfirm ? { color: "#ff0000b3" } : {}}>
          Comfirm Password
        </p>
        <input
          className={classes.input}
          onFocus={() => {
            setError({ ...error, comfirm: false });
          }}
          ref={comfirmPassRef}
          type="password"
          placeholder="Comfirm Password"
        />
        {!success && (
          <button className={classes["btn"]} onClick={changePasswordHandler}>
            Submit Password
          </button>
        )}
        {success && (
          <button
            style={{ backgroundColor: "green" }}
            className={classes["btn"]}
          >
            Change password success
          </button>
        )}
      </div>
    </div>
  );
}
