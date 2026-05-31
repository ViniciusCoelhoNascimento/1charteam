import React, { useState } from "react";

function Modal({ modalType, onClose, onConfirm}) {
    const [nickname, setNickname] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const handleConfirm = () => {
        onConfirm({ nickname, roomCode, modalType });
    };

    return (
        <div>
            {modalType === "join" && (
                <input
                    placeholder="Código da sala"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    />
            )}
            
            <input
            placeholder="Seu nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            />

            <button onClick={handleConfirm}>Confirmar</button>
            <button onClick={onClose}>Fechar</button>
        </div>
    );
}

export default Modal;