import { useState, useRef } from "react";
import axios from "axios";
import classes from "../Setting.module.css";
export default function ChangeName() {
  const [isChangeName, setIsChangeName] = useState(false);
  const [classInput, setClassInput] = useState(classes.input);
  const newNameRef = useRef();

  // change name handler
  const submitChangeNameHandler = () => {
    const newName = newNameRef.current.value;
    axios
      .post("/change-new-name", { newName: newName })
      .then((res) => {
        if (res.status === 200) {
          setClassInput(`${classes.input} ${classes.success}`);
          setTimeout(() => {
            setIsChangeName(false);
            setClassInput(`${classes.input}`);
          }, 1000);
        }
      })
      .catch((err) => {
        setClassInput(`${classes.input} ${classes.failed}`);
      });
  };
  return (
    <>
      <li
        onClick={() => {
          setIsChangeName((is) => !is);
        }}
        className={classes["setting-item"]}
      >
        Change Name
      </li>
      {isChangeName && (
        <div className={classes["form-submit"]}>
          <input
            className={classInput}
            type="text"
            placeholder="New name..."
            ref={newNameRef}
            onFocus={(e) => {
              setClassInput(`${classes.input}`);
            }}
          />
          <button onClick={submitChangeNameHandler}>Submit</button>
        </div>
      )}
    </>
  );
}
