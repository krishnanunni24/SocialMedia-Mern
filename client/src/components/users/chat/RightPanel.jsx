import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import UserMessage from "../message/userMessage";
import ReceiverMessage from "../message/ReceiverMessage";
import { createMessage, fetchMessages } from "../../../api/chatRequests";

function RightPanel({ receivedMessage, receiver, setSendMessage }) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    if (!receivedMessage) return;
    if (messages.length > 0) {
      setMessages([...messages, receivedMessage]);
    } else {
      setMessages([receivedMessage]);
    }
  }, [receivedMessage]);

  const handleSend = (e) => {
    if (!newMessage || !newMessage.trim()) {
      return; // Do nothing if newMessage is empty
    }

    const data = {
      receiverId: receiver._id,
      senderId: user._id,
      message: newMessage,
    };
    const sendMessage = async (data) => {
      try {
        const response = await createMessage(data);
        data.chatId = response.data.newMessage.chatId
        if (messages.length > 0) {
          setMessages([...messages, response.data.newMessage]);
        } else {
          setMessages([response.data.newMessage]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    sendMessage(data).then(() => {
      setSendMessage(data)
      setNewMessage("");
    });
  };
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // useEffect(
  //   ()=>{
  //    fetchMessages()
  //   },[]
  // )
  const getMessages = async (receiverId, userId) => {
    try {
      const response = await fetchMessages(receiverId, userId);
      const newMessages = response.data;

      // Use functional update to avoid dependency on `messages` state
      setMessages(newMessages);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.data) {
        setMessages([]);
      }
    }
  };

  useEffect(() => {
    setMessages([]);
    if (receiver) {
      getMessages(receiver._id, user._id);
    }
  }, [receiver]);

  return (
    <div className="bg-white dark:bg-gray-800 lg:w-8/12">
      {receiver ? (
        <>
          <div className="relative flex flex-col border-b px-6 py-4 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <img
                    src={receiver?.profilePicture}
                    alt=""
                    className="absolute h-full w-full rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 m-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-md"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-black dark:text-white">
                    {receiver?.username}
                  </h4>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
              <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <i className="icon-material-outline-more-vert"></i>
              </button>
            </div>
          </div>

          <div className="h-[calc(80vh-250px)] w-full overflow-y-auto p-5 py-10 md:h-[calc(80vh-137px)]">
            {messages.length &&
              messages?.map((message, key) => {
                if (message.senderId === user._id) {
                  return (
                    <UserMessage user={user} message={message} key={key} />
                  );
                } else {
                  return (
                    <ReceiverMessage
                      receiver={receiver}
                      message={message}
                      key={key}
                    />
                  );
                }
              })}
          </div>

          <div className="border-t px-6 py-4 dark:border-gray-600">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={handleInputChange}
                className="w-full rounded-full bg-gray-100 px-4 py-2 focus:outline-none dark:bg-gray-700"
              />
              <button
                onClick={handleSend}
                className="ml-4 rounded-lg bg-accent p-2 font-semibold text-white hover:bg-slate-100 hover:text-accent"
              >
                <span className="flex items-center">
                  <AiOutlineSend />
                  <span>Send</span>
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-semibold">Select Users to Chat</span>
        </div>
      )}
    </div>
  );
}

export default RightPanel;
