import React, { useState } from "react";
import Modal from "../components/Modal";

function Home({ onEnterRoom }) {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null); // create ou join

    const handleCreate = () => {
        setModalType("create");
        setShowModal(true);
    };

    const handleJoin = () => {
        setModalType("join");
        setShowModal(true);
    };

    const handleConfirm = ({ nickname, roomCode }) => {
        setShowModal(false);
        onEnterRoom({ nickname, roomCode, modalType});
    };

   return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-10">
      <div className="text-center">
        <h1 className="text-6xl font-thin tracking-[0.3em] text-stone-800 uppercase">
          1CharTeam
        </h1>
        <p className="mt-3 text-stone-400 text-sm tracking-widest uppercase">
          colaboração forçada, um caractere por vez
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCreate}
          className="px-8 py-3 bg-stone-800 text-stone-50 text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors"
        >
          Criar sala
        </button>
        <button
          onClick={handleJoin}
          className="px-8 py-3 border border-stone-300 text-stone-600 text-sm tracking-widest uppercase hover:border-stone-500 hover:text-stone-800 transition-colors"
        >
          Entrar em sala
        </button>
      </div>

      {showModal && (
        <Modal
          modalType={modalType}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
    );
}

export default Home;