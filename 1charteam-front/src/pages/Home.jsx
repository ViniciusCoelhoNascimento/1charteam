import React, { useState } from "react";
import Modal from "../components/Modal";

function Home({ onEnterRoom }) {
    const [showModal, setSHowModal] = useState(false);
    const [modalType, setModalType] = useState(null); // create ou join

    const handleCreate = () => {
        setModalType("create");
        setSHowModal(true);
    };

    const handleJoin = () => {
        setModalType("join");
        setSHowModal(true);
    };

    const handleConfirm = ({ nickname, roomCode }) => {
        setSHowModal(false);
        onEnterRoom({ nickname, roomCode, modalType});
    };

    return (
        <div>
            <h1>1CharTeam</h1>
            <button onClick={handleCreate}>Criar sala</button>
            <button onClick={handleJoin}>Entrar em sala</button>

            {showModal && (
                <Modal
                modalType={modalType}
                onClose={()=>setSHowModal(false)}
                onConfirm={handleConfirm}
                />
            )}
        </div>
    );
}

export default Home;