import React from "react";
import { X } from "lucide-react";
import "./ModalMessage.css";

export default function ModalMessage({ message, type = "info", onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-box modal-${type}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        <p className="modal-text">{message}</p>
      </div>
    </div>
  );
}
