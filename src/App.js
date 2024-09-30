import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
const url = "https://merlin-server-tk9w.onrender.com";
// const url = "http://localhost:8080";
const socket = io(url);

const App = () => {
  const [msg, setmsg] = useState([]);
  const [nick, setNick] = useState("");
  const [msglist, setmsglist] = useState([]);
  const sendmsg = () => {
    if (msg.trim() !== "") {
      socket.emit("msg", { msg, nick });
      setmsg("");
    } else {
      alert("빈칸은 싫어욧");
    }
  };
  const test = async () => {
    const { value } = await Swal.fire({
      title: "닉네임입력",
      icon: "warning",
      input: "text",
      confirmButtonText: "확인",
      allowOutsideClick: false,
      preConfirm: (value) => {
        if (value.trim() == "") {
          Swal.showValidationMessage("어허");
          return false;
        }
        return value;
      },
    });
    if (value) {
      setNick(value);
    }
  };
  useEffect(() => {
    test();
    socket.on("msg", (newmsg) => {
      setmsglist((prevmsg) => [...prevmsg, newmsg]);
    });

    socket.on("msglist", (msglist) => {
      setmsglist(msglist);
    });

    // 컴포넌트가 언마운트될 때 리스너 정리
    return () => {
      socket.off("msg");
      socket.off("msglist");
    };
  }, []);

  return (
    <>
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
          placeholder="인원당 3번만 보내기"
        ></input>
        <button type="submit">메세지보내기</button>
      </form>

      <h1 className="공지">몇 분 지나면 메세지 날아가요</h1>
      <ul>
        <li>안녕하세요~</li>
        {msglist.map((msg, index) => (
          <li key={index}>
            {msg.nick}:{msg.msg}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
