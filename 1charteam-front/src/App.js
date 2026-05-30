import React, { useState } from 'react';
import logo from './logo.svg';
import Document from './pages/Document';
import './App.css';
import Home from './pages/Home';

function App() {
  const [page, setPage] = useState("home");
  const [nickname, setNickname] = useState("");
  const [roomCode, setRoomCode] = useState("");
  
  const handleEnterRoom = ({ nickname, roomCode }) => {
    setNickname(nickname);
    setRoomCode(roomCode);
    setPage("document");
  };

  const handleLeave = () => {
    setNickname("");
    setRoomCode("");
    setPage("home");
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
        onLeave={handleLeave}
        currentTurn=""
        text=""
        />
      )}
    </>
  );
}

export default App;
