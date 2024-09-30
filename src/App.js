import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chat from "./components/Chat.js";
import NickInput from "./components/NickInput.js";
import { Start } from "./pages/Start.js";

// const url = "https://merlin-server-tk9w.onrender.com";
const url = "http://localhost:8080";
const App = () => {
  const [socket, setSocket] = useState(null);
  const [nick, setNick] = useState("");
  const [usercount, setUsercount] = useState(0);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("usercount", (count) => {
      setUsercount(count);
    });

    return () => {
      socket.off("usercount");
    };
  }, [socket]);

  const renderPage = () => {
    if (!socket) return <div>Loading...</div>;
    switch (currentPage) {
      case "1":
        return <Start />;
      default:
        return (
          <div>
            <h1>{usercount}명 접속중</h1>
            <NickInput setNick={setNick} />
            <Chat socket={socket} nick={nick} />
          </div>
        );
    }
  };

  return <>{renderPage()}</>;
};

export default App;
