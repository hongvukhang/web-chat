import { useRef, useState } from "react";
import classes from "../../Setting.module.css";
import { useCookies } from "react-cookie";
import axios from "axios";
export default function ChangeName() {
  const [cookies, setCookie] = useCookies(["name"]);
  const nameRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const changeNameHandler = () => {
    const newName = nameRef.current.value;
    axios
      .post("/change-new-name", { newName: newName })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setCookie("name", newName);
        }
      })
      .catch((err) => {
        setError(true);
      });
  };
  return (
    <>
      <p style={error.comfirm ? { color: "#ff0000b3" } : {}}>Name</p>
      <input
        onFocus={() => setError(false)}
        ref={nameRef}
        className={classes["input"]}
        type="text"
        placeholder="Type your name"
        defaultValue={cookies.name}
      />
      {!success && (
        <button className={classes["btn"]} onClick={changeNameHandler}>
          Submit Name
        </button>
      )}
      {success && (
        <button style={{ backgroundColor: "green" }} className={classes["btn"]}>
          Change name success
        </button>
      )}
    </>
  );
}
