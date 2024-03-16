import { useState, useEffect } from "react";
import React from "react";
import classes from "./authentication.module.css";
export default function Input({ changeData, title, type, err }) {
  const [className, setClassName] = useState(classes["label"]);
  const [error, setError] = useState("");

  useEffect(() => {
    const key = err?.split("+")[0];
    setError(key);
  }, [err]);
  return (
    <div
      onFocus={() => {
        setError("");
      }}
      className={classes["input-container"]}
    >
      <input
        type={type}
        className={type === "email" ? classes["input-email"] : classes["input"]}
        id={title}
        autoComplete="off"
        required
        onChange={(e) => changeData(e)}
      />
      <label
        className={
          error === title.toLowerCase()
            ? `${className} ${classes.error}`
            : className
        }
        htmlFor={title}
      >
        {title}
      </label>
    </div>
  );
}
