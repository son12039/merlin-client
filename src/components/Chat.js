import React, { useEffect, useState } from "react";

const Chat = ({ socket, nick }) => {
  const [msg, setmsg] = useState("");
  const [msglist, setmsglist] = useState([]);

  const sendmsg = () => {
    if (msg.trim() !== "") {
      socket.emit("msg", { msg, nick });
      setmsg("");
    } else {
      alert("빈칸은 싫어욧");
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("msg", (newmsg) => {
      setmsglist((prevmsg) => [...prevmsg, newmsg]);
    });

    socket.on("msglist", (msglist) => {
      setmsglist(msglist);
    });

    return () => {
      socket.off("msg");
      socket.off("msglist");
    };
  }, [socket]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendmsg();
        }}
      >
        <input
          type="text"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
          placeholder="테러금지"
        />
        <button type="submit">메세지보내기</button>
      </form>
      <ul>
        {msglist.map((msg, index) => (
          <li key={index}>
            {msg.nick}: {msg.msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
