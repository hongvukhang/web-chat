import { useState } from "react";
import axios from "axios";
import classes from "../Setting.module.css";
export default function ChangeAvatar() {
  const [isAvatar, setIsAvatar] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarData, setAvatarData] = useState({
    current: "",
    list: [],
  });
  const [resAvatar, setResAvatar] = useState({
    status: false,
    msg: <span></span>,
  });
  //get avatar
  const getAvatar = () => {
    axios
      .get("/get-avatar")
      .then((res) => {
        const list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          if (list[i] === res.data.avatar) {
            [list[0], list[i]] = [list[i], list[0]];
            break;
          }
        }
        setAvatarData({
          current: res.data.avatar,
          list: list,
        });
        setAvatar(res.data.avatar);
      })
      .catch((err) => {});
  };
  //change avatar
  const changeAvatarHandler = (e) => {
    e.preventDefault();
    if (!avatar) return false;
    const form = new FormData();
    if (typeof avatar === "string") form.append("avatar", avatar);
    else form.append(avatar[0].name, avatar[0]);

    axios
      .post("/save-avatar", form)
      .then((res) => {
        setResAvatar({
          status: true,
          msg: <span style={{ color: "#02ff00" }}>Success</span>,
        });
        setTimeout(() => {
          getAvatar();
        }, 1000);
      })
      .catch((err) => {
        setResAvatar({
          status: true,
          msg: <span style={{ color: "#e10000" }}>Failure</span>,
        });
      });
  };
  return (
    <>
      <li
        onClick={() => {
          if (!isAvatar) {
            getAvatar();
          }
          setIsAvatar((is) => !is);
          setResAvatar({
            status: false,
            msg: <span></span>,
          });
        }}
        className={`${classes["setting-item"]} ${classes["item-avatar"]}`}
      >
        Change Avatar
        {resAvatar.status && resAvatar.msg}
      </li>
      {isAvatar && (
        <>
          <div className={classes["avatar-main"]}>
            {avatarData.list.map((li) => {
              const classActive =
                avatar === li
                  ? `${classes["avatar"]} ${classes["active"]}`
                  : classes["avatar"];
              return (
                <img
                  onClick={() => setAvatar(li)}
                  className={classActive}
                  key={li}
                  alt="avatar"
                  src={li}
                />
              );
            })}
          </div>
          <form
            onSubmit={changeAvatarHandler}
            className={classes["form-add_avatar"]}
          >
            <input
              type="file"
              onChange={(e) => setAvatar([...e.target.files])}
              style={{ display: "none" }}
              id="avatar"
            />
            <label htmlFor="avatar">New Avatar</label>
            <button>Submit</button>
          </form>
        </>
      )}
    </>
  );
}
