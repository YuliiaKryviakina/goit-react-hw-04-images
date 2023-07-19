import { createPortal } from "react-dom";
import React, { Component } from "react";
import css from "./Modal.module.css";
import propTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={this.props.largeImage} alt="BigImage" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImage: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};
