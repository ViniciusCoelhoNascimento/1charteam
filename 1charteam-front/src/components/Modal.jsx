import React, { useState } from "react";

function Modal({ modalType, onClose, onConfirm}) {
    const [nickname, setNickname] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const handleConfirm = () => {
        onConfirm({ nickname, roomCode, modalType });
    };

    return (
        <div className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm mx-4 p-8 shadow-sm">
        <h2 className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">
          {modalType === "create" ? "Nova sala" : "Entrar em sala"}
        </h2>

        <div className="flex flex-col gap-4">
          {modalType === "join" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs tracking-widest uppercase text-stone-400">
                Código da sala
              </label>
              <input
                className="border-b border-stone-200 py-2 text-stone-800 text-sm outline-none focus:border-stone-500 transition-colors bg-transparent"
                placeholder="0000"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs tracking-widest uppercase text-stone-400">
              Nickname
            </label>
            <input
              className="border-b border-stone-200 py-2 text-stone-800 text-sm outline-none focus:border-stone-500 transition-colors bg-transparent"
              placeholder="seu nome"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 bg-stone-800 text-stone-50 text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-stone-200 text-stone-400 text-xs tracking-widest uppercase hover:border-stone-400 hover:text-stone-600 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
    );
}

export default Modal;