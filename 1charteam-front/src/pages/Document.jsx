import React from "react";

function Document({roomCode, nickname, currentTurn, text, onLeave, onChar}){
    const isMyTurn = currentTurn === nickname;

    const handleKeyDown = (e) => {
        if (!isMyTurn) return;
        if (e.key.length !== 1) return;
        onChar(e.key);
    };

    return (
        <div onKeyDown={handleKeyDown} tabIndex={0}>
            <div>
                <span>Sala: {roomCode}</span>
                <span>Vez de: {currentTurn === nickname ? "você" : currentTurn}</span>
                <button onClick={onLeave}>Sair</button>
            </div>

            <div>
                <p>{text}</p>
            </div>

            {isMyTurn && <p>Sua vez! Digite um caractere.</p>}
        </div>
    );
}

export default Document;