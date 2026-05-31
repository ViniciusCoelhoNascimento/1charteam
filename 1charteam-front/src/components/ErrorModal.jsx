import React, { useEffect, useState } from "react";

const vogonErrors = [
  "Zarblatnik vogrunthos — praxtibulum erratum 7-G! Formulate requisition in triplicate!",
  "Splurdnik! Oblaxum void-sector 3 — access deniatum by sub-committee 12-F!",
  "Voblax grumthar erratum! Sector praxtibulum not found — file complaint in quadruplicate!",
  "Ghrunthos voblax! Connexium failatum — awaiting approval from department 9-B!",
  "Splagnuk! Roomtibulum not existum — submit form 27-B stroke 6 to proceed!",
];

function ErrorModal({ onClose }) {
  const [message] = useState(
    () => vogonErrors[Math.floor(Math.random() * vogonErrors.length)]
  );

  return (
    <div className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm mx-4 p-8 shadow-sm">
        <h2 className="text-xs tracking-[0.3em] uppercase text-red-400 mb-2">
          Erro Vogon
        </h2>
        <p className="text-stone-500 text-sm leading-relaxed italic mb-8">
          "{message}"
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-stone-800 text-stone-50 text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors"
        >
          Acknowledged
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;