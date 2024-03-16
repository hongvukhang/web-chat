import React from "react";
import { Link } from "react-router-dom";
import classes from "./NotFound.module.css";
const NotFound = () => (
  <div className={classes["not-found"]}>
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
    />
    <Link to="/" className={classes["link-home"]}>
      Go Home
    </Link>
  </div>
);

export default NotFound;
