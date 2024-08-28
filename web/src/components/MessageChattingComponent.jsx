import React, { useContext, useRef, useEffect, useState } from "react";
import { MENU_DEFAULT, PHONE_WIDTH, MENU_MESSAGE } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdOutlinePhone,
  MdArrowBackIosNew,
  MdSend,
  MdOutlineCameraAlt,
} from "react-icons/md";

const MessageChattingComponent = ({ isShow }) => {
  const { setMenu, chatting, setChatting } = useContext(MenuContext);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      // behavior: "smooth",
    });
  };

  useEffect(() => {
    console.log(JSON.stringify(chatting));
    scrollToBottom();
  }, [chatting]);

  const handleMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const sendMessage = () => {
    console.log("send " + message);
    setMessage("");

    const newMessage = {
      time: "just now",
      message: message,
      isMe: true, // or false, depending on who sent the message
    };
    setChatting((prevChatting) => ({
      ...prevChatting,
      chats: [...prevChatting.chats, newMessage],
    }));
  };

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      {chatting == undefined ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="absolute top-0 flex w-full justify-between py-1.5 bg-black pt-8 z-10">
            <div className="flex items-center px-2 space-x-2 cursor-pointer">
              <div>
                <MdArrowBackIosNew
                  className="text-lg text-blue-500"
                  onClick={() => setMenu(MENU_MESSAGE)}
                />
              </div>

              <img
                src={chatting.avatar}
                className="w-8 h-8 object-cover rounded-full"
                alt=""
                onError={(error) => {
                  error.target.src = "./images/noimage.jpg";
                }}
              />
              <div className="flex flex-col">
                <div className="text-sm text-white line-clamp-1 font-medium">
                  {chatting.conversation_name}
                </div>
                <span className="text-xss font-light text-gray-400 -mt-1">
                  last seen {chatting.last_seen}
                </span>
              </div>
            </div>

            <div className="flex items-center px-2 text-white cursor-pointer">
              <MdOutlinePhone className="text-lg" />
            </div>
          </div>

          <div
            className="flex flex-col w-full h-full text-white overflow-y-auto"
            style={{
              paddingTop: 60,
            }}
          >
            <div className="flex-1 justify-between flex flex-col h-full">
              <div className="no-scrollbar flex flex-col space-y-4 p-3 overflow-y-auto pb-12">
                {chatting.chats &&
                  chatting.chats.map((v, i) => {
                    return !v.isMe ? (
                      <div className="flex items-end" key={i}>
                        <div
                          className="relative flex flex-col text-xs items-start"
                          style={{
                            maxWidth: `${PHONE_WIDTH - 50}px`,
                          }}
                        >
                          <span
                            className="pb-4 px-2 py-1.5 rounded-lg inline-block rounded-bl-none bg-[#242527] text-white text-left"
                            style={{
                              minWidth: `50px`,
                            }}
                          >
                            {v.message}
                          </span>
                          <span
                            className="absolute bottom-0 right-1 text-gray-100"
                            style={{
                              fontSize: 10,
                            }}
                          >
                            {v.time}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-end justify-end" key={i}>
                        <div
                          className="relative flex flex-col text-xs items-end"
                          style={{
                            maxWidth: `${PHONE_WIDTH - 50}px`,
                          }}
                        >
                          <span
                            className="pb-4 px-2 py-1.5 rounded-lg inline-block rounded-br-none bg-[#134D37] text-white text-left"
                            style={{
                              minWidth: `50px`,
                            }}
                          >
                            {v.message}
                          </span>
                          <span
                            className="absolute bottom-0.5 right-1 text-gray-100"
                            style={{
                              fontSize: 10,
                            }}
                          >
                            {v.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                <div ref={messagesEndRef}></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 bg-black flex items-center w-full pb-5 pt-2">
            <div className="flex flex-wrap items-center text-white ml-2 mr-2 cursor-pointer">
              <MdOutlineCameraAlt className="text-xl" />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-full px-2 py-1 bg-[#3B3B3B]"
                value={message}
                autoComplete="off"
                onChange={handleMessage}
              />
            </div>
            <div
              onClick={sendMessage}
              className="flex items-center bg-[#33C056] text-black rounded-full p-1.5 ml-2 mr-2 hover:bg-[#134d37] cursor-pointer text-white"
            >
              <MdSend className="text-sm" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MessageChattingComponent;
