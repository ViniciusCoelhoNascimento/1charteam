import React, { useRef, useEffect } from "react";

function Document({roomCode, nickname, currentTurn, text, onLeave, onChar}){
    const isMyTurn = currentTurn === nickname;
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current?.focus();
    }, []);

    const handleKeyDown = (e) => {
        if (!isMyTurn) return;
        if (e.key.length !== 1) return;
        onChar(e.key);
    };

    return (
    <div
      ref={divRef}
      className="min-h-screen bg-stone-50 flex flex-col outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-stone-100">
        <span className="text-xs tracking-[0.3em] uppercase text-stone-800 font-light">
          1CharTeam
        </span>
        <div className="flex items-center gap-6">
          <span className="text-xs tracking-widest uppercase text-stone-400">
            Sala: <span className="text-stone-700 font-medium">{roomCode}</span>
          </span>
          <div className={`text-xs tracking-widest uppercase px-3 py-1 ${isMyTurn ? "bg-stone-800 text-stone-50" : "bg-stone-100 text-stone-400"}`}>
            {isMyTurn ? "✦ sua vez" : `vez de: ${currentTurn}`}
          </div>
          <button
            onClick={onLeave}
            className="text-xs tracking-widest uppercase text-stone-300 hover:text-stone-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Área do documento */}
      <div className="flex-1 flex justify-center px-8 py-16">
        <div className="w-full max-w-2xl">
          <div className="bg-white shadow-sm min-h-96 p-12">
            <p className="text-stone-700 text-base leading-relaxed font-light whitespace-pre-wrap">
            {text || (!isMyTurn && (
                <span className="text-stone-300 italic">
                O documento está vazio. Aguardando...
                </span>
            ))}
            {isMyTurn && (
                <span className="caret-blink text-stone-800">|</span>
            )}
            </p>
          </div>
          {isMyTurn && (
            <p className="mt-3 text-xs tracking-widest uppercase text-stone-400 text-center">
              pressione qualquer tecla para digitar
            </p>
          )}
        </div>
      </div>
    </div>
    );
}

export default Document;