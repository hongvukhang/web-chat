import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaArrowRight } from "react-icons/fa";
import classes from "./CreateGroup.module.css";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { display } from "../../../../redux/showAlertSlice";
import { isShow } from "../../../../redux/showCreateGroup";
export default function CreateGroup({ close }) {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/get-all-user")
      .then((res) => {
        setUser(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addUser = (_id) => {
    const dataGroup = data.filter((user) => user._id === _id);
    group.push(dataGroup[0]);
    setGroup(group);
    const remainUser = user.filter((user) => user._id !== _id);
    setUser(remainUser);
  };

  const deleteUser = (_id) => {
    const dataGroup = group.filter((user) => user._id !== _id);
    const ids = dataGroup.map((user) => user._id);
    setGroup(dataGroup);

    const dataUser = data.filter((user) => !ids.includes(user._id));
    setUser(dataUser);
  };
  const createGroup = () => {
    const ids = group.map((user) => user._id);
    if (ids.length < 2) {
      dispatch(
        display({
          severity: "error",
          close: { title: "close" },
          message: "The group has at least 3 members (including you)",
        })
      );
      return null;
    }
    axios.post(`/chat/send-message`, { userId: ids }).then((res) => {
      navigate(`/chat/${res.data}`);
      dispatch(isShow(false));
    });
  };
  return ReactDOM.createPortal(
    <main className={classes.container}>
      <FaArrowRight onClick={() => dispatch(isShow(false))} />
      <ul className={classes["list-group"]}>
        {group.map((element) => {
          return (
            <li
              key={element._id}
              className={classes["items-group"]}
              onClick={() => deleteUser(element._id)}
            >
              <div className={classes["info-user"]}>
                <img src={element.avatar} alt="avatar" />
                <h4>{element.name}</h4>
              </div>
            </li>
          );
        })}
      </ul>
      <h3 className={classes["title"]}>Create Group</h3>
      <ul className={classes["list-friend"]}>
        {user.map((element) => {
          return (
            <li key={element._id} className={classes.items}>
              <div className={classes["info-user"]}>
                <img src={element.avatar} alt="avatar" />
                <h4>{element.name}</h4>
              </div>
              <FaPlus
                onClick={() => {
                  addUser(element._id);
                }}
              />
            </li>
          );
        })}
      </ul>
      <button onClick={createGroup} className={classes.btn}>
        Create Group
      </button>
    </main>,
    document.querySelector("body")
  );
}
