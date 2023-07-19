import { createPortal } from "react-dom";
import React, { useEffect } from "react";
import css from "./Modal.module.css";
import propTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ largeImage, onClose }) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeImage} alt="BigImage" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImage: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};
