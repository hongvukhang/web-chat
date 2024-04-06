import React from "react";
import classes from "../../ChatBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { display } from "../../../../redux/showImageSlice";
import ShowImage from "../showImage/ShowImage";
export default function MessageItem({ msg, container, tittle }) {
  const [reload, setReload] = React.useState(false);
  const createAt = new Date(msg.createAt);
  const hour = createAt.getHours();
  const minute = createAt.getMinutes();
  const dispatch = useDispatch();
  const isShowImage = useSelector((state) => state.show_image);
  return (
    <>
      {tittle === "receiver" && (
        <span className={classes["name-receiver"]}>{msg.name}</span>
      )}
      <div className={classes[container]}>
        <li className={classes[tittle]}>
          {tittle === "receiver" && (
            <img
              src={msg.avatar}
              alt="avatar"
              className={classes["avatar-message"]}
              style={{ height: "20px" }}
            />
          )}
          {msg.type === "image" && (
            <img
              onError={() => {
                console.log("The img error");
                setTimeout(() => {
                  setReload(true);
                }, 1000);
              }}
              onClick={() => {
                dispatch(display(msg.message));
              }}
              src={msg.message}
            />
          )}
          {msg.type === "text" && <p>{msg.message}</p>}
          {msg.type === "url" && (
            <a href={msg.message} target="_blank">
              {msg.message}
            </a>
          )}

          <span className={classes["time-message"]}>
            {hour + " : " + minute}
          </span>
        </li>
      </div>
      {isShowImage.status && <ShowImage />}
    </>
  );
}
