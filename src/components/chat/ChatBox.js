import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { MdOutlineEmojiEmotions, MdSend } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { IoIosSend, IoIosCloseCircle } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

import classes from "./ChatBox.module.css";

import Sender from "./element/Sender";
import Receiver from "./element/Receiver";
import Loading from "./element/Loading";

import Navbar from "../home/element/Navbar";
import ListChat from "../home/element/ListChat";
import { useDispatch } from "react-redux";
import { display } from "../../redux/showAlertSlice";
import { useCookies } from "react-cookie";
import CreateGroup from "./element/createGroup/CreateGroup";
export default function ChatBox({ socket, message }) {
  const params = useParams();
  const navigate = useNavigate();
  const [cookie] = useCookies(["auth"]);
  const [receiver, setReceiver] = useState([
    {
      userName: "Default",
      _id: null,
      avatar: window.location.origin + "/images/avatar.png",
    },
  ]);
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [msgImages, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reloading, setReloading] = useState({ msg: "reloading" });
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const msgRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    msgRef.current.value = "";
  }, [params]);

  const scrollBottom = useRef();

  //function load messages
  const loadMessages = () => {
    axios
      .get(`/chat/${params.id}`)
      .then((res) => {
        setReceiver(res.data.receive);
        setMsgs(res.data.messages);
      })
      .catch((error) => {
        dispatch(
          display({
            message: error?.response?.data?.msg ?? "Some thing wrong!",
            severity: "error",
            close: { title: "close" },
          })
        );
        navigate("/");
      });
  };

  // function is url
  function isURL(str) {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }
  // use effect reload message
  useEffect(() => {
    if (message?.msg !== "reloading") {
      setImages(() => []);
      setTimeout(() => {
        loadMessages();
      }, 1000);
    } else {
      loadMessages();
    }
  }, [message, params]);
  //emit message
  const send_message = () => {
    const msg = msgRef.current.value;
    const isURLValue = isURL(msg);

    msg &&
      socket.emit("msg", {
        idChat: params.id,
        receiver_id: receiver._id,
        msg: msg,
        type: isURLValue ? "url" : "text",
        token: cookie.auth,
      });

    msgRef.current.value = "";
    const loadMessages = [
      ...msgs,
      {
        _id: Math.random(),
        type: isURLValue ? "url" : "text",
        message: msg,
        createAt: new Date(),
        sender: true,
      },
    ];
    setMsgs(loadMessages);
    setReloading({ msg: "reloading" });
  };
  //send images
  const sendImages = () => {
    msgImages.forEach((img) => {
      socket.emit(
        "msgImage",
        img,
        {
          idChat: params.id,
          receiver_id: receiver._id,
          originalname: img.name,
          mimetype: img.type,
          token: cookie.auth,
        },
        (callback) => {
          console.log(callback);
        }
      );
    });

    setImages([]);
    setIsLoading(true);
    setTimeout(() => {
      loadMessages();
      setIsLoading(false);
    }, 1500);
    setReloading({ msg: "reloading" });
  };
  //scroll to bottom message
  const scrollToBottom = () => {
    scrollBottom.current.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  });

  //get emoji
  const location = useLocation();
  const closeHandler = () => {
    setIsCreateGroup((is) => !is);
  };
  return (
    <main className={classes["chat-container"]}>
      <Navbar socket={socket} />

      <main className={classes["responsive-chat"]}>
        <ListChat
          className={location.pathname !== "/" ? "none" : ""}
          reload={message}
          reloadSend={reloading}
        />

        <main className={classes["container-chatbox"]}>
          <div className={classes["user-detail"]}>
            {receiver.length <= 1 && (
              <div>
                <img src={receiver[0].avatar} />
                <h3 className={classes["user-name"]}>{receiver[0].userName}</h3>
              </div>
            )}
            {receiver.length > 1 && (
              <div className={classes["name-group_container"]}>
                <div className={classes["avatar-container"]}>
                  <img
                    src={
                      receiver[0].avatar === cookie.avatar
                        ? receiver[1].avatar
                        : receiver[0].avatar
                    }
                    alt="avatar"
                  />
                  <img
                    src={
                      receiver[receiver.length - 1].avatar === cookie.avatar
                        ? receiver[receiver.length - 2].avatar
                        : receiver[receiver.length - 1].avatar
                    }
                    alt="avatar"
                  />
                </div>
                <div className={classes["name-group"]}>
                  <h3 className={classes["user-name"]}>
                    {receiver.map((user, index) => (
                      <span key={index}>{user.userName}, </span>
                    ))}
                  </h3>
                </div>
              </div>
            )}
            <BsThreeDotsVertical
              style={{ height: "1.5rem", width: "1.5rem", cursor: "pointer" }}
              onClick={() => setIsOptions((is) => !is)}
            />
          </div>
          <ul className={classes["message-container"]}>
            {msgs.map((msg) => {
              if (!msg.sender) {
                return <Receiver key={msg._id} msg={msg} />;
              } else {
                return <Sender key={msg._id} msg={msg} />;
              }
            })}
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Loading />
              </div>
            )}

            <div ref={scrollBottom} />
          </ul>

          {isShowEmoji && (
            <main className={classes["pick-emoji"]}>
              <Picker
                data={data}
                onEmojiSelect={(e) => {
                  msgRef.current.value = msgRef.current.value + e.native;
                }}
              />
            </main>
          )}
          {msgImages?.length !== 0 && (
            <div className={classes["show-image"]}>
              <div>
                <IoIosCloseCircle
                  onClick={() => {
                    setImages([]);
                  }}
                />
                {msgImages.map((img) => (
                  <span key={img.lastModifiedDate}>{" " + img.name + " "}</span>
                ))}
              </div>
              <button
                onClick={sendImages}
                className={classes["btn-send_images"]}
              >
                <MdSend />
              </button>
            </div>
          )}
          <div className={classes["input-message"]}>
            <textarea
              ref={msgRef}
              aria-valuetext={
                msgRef.current?.value ? msgRef.current.value : " "
              }
              placeholder="Message..."
            />
            <input
              style={{ display: "none" }}
              type="file"
              id="image"
              name="image"
              multiple
              onChange={(e) => {
                setImages([...e.target.files]);
              }}
            />
            <label className={classes["send-images"]} htmlFor="image">
              <FaImage />
            </label>

            <button
              onClick={() => {
                setIsShowEmoji((is) => !is);
              }}
              className={classes["btn-emoji"]}
            >
              <MdOutlineEmojiEmotions />
            </button>
            <button
              onClick={send_message}
              className={classes["btn-send_message"]}
            >
              <IoIosSend />
            </button>
          </div>
          {isCreateGroup && <CreateGroup close={closeHandler} />}
        </main>
        {isOptions && (
          <div className={classes["create-group_container"]}>
            <span>Create Group</span>
            <button
              onClick={() => {
                setIsOptions((is) => !is);
                setIsCreateGroup((is) => !is);
              }}
            >
              Create +
            </button>
          </div>
        )}
      </main>
    </main>
  );
}
