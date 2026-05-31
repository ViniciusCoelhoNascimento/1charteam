import React, { useState, useCallback } from 'react';
import Document from './pages/Document';
import './App.css';
import Home from './pages/Home';
import { useWebSocket } from "./hooks/useWebSocket"

function App() {
  const [page, setPage] = useState("home");
  const [nickname, setNickname] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [text, setText] = useState("");
  const [currentTurn, setCurrentTurn] = useState("");
  
  const handleMessage = useCallback((data) => {
    console.log("Mensagem recebida:", data);
    if (data.type === "created") {
      setText(data.text);
      setCurrentTurn(data.currentTurn);
      setRoomCode(data.roomCode);
      setPage("document");
    }
    if (data.type === "update") {
      console.log("update recebido:", data);
      setText(data.text);
      setCurrentTurn(data.currentTurn);
      setRoomCode(data.roomCode);
      setPage("document");
    }
    if (data.type === "error") {
      alert(data.message);
    }
  }, []);

  const { sendMessage } = useWebSocket(handleMessage);

  const handleEnterRoom = ({ nickname, roomCode, modalType }) => {
    setNickname(nickname);
    setRoomCode(roomCode);
    console.log("modalType:", modalType);
    if (modalType === "create") {
      sendMessage({ type: "create", nickname });
    } else {
      sendMessage({ type: "join", nickname, roomCode });
    }
  };

  const handleLeave = () => {
    setNickname("");
    setRoomCode("");
    setText("");
    setCurrentTurn("");
    setPage("home");
  };

  const handleChar = (char) => {
    sendMessage({ type: "char", char });
  };

  return (
    <>
      {page === "home" && (
        <Home onEnterRoom={handleEnterRoom}/>
      )}
      {page === "document" && (
        <Document
        nickname={nickname}
        roomCode={roomCode}
        currentTurn={currentTurn}
        text={text}
        onLeave={handleLeave}
        onChar={handleChar}
        />
      )}
    </>
  );
}

export default App;
