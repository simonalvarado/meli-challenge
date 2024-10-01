import React, { useEffect, useState, useCallback } from "react";
import Spinner from "../Spinner/Spinner.js";
import { ReactComponent as CloseIcon } from "../../assets/x-icon.svg";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("modal-open");
      setImageLoaded(false);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal__wrapper">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <CloseIcon className="modal__close-icon" aria-hidden="true" />
        </button>
        <div className="modal__image-wrapper">
          {!imageLoaded && <Spinner />}
          <img
            src={item.image}
            alt={item.title}
            className={`modal__image ${imageLoaded ? "modal__image--loaded" : ""}`}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="modal__content">
          <h1 id="modal-title" className="modal__title">
            {item.title}
          </h1>
          <p className="modal__description">{item.description}</p>
          <div className="modal__info-wrapper">
            <h2 className="modal__info-subtitle">Información del producto</h2>
            <p className="modal__info">{item.detail.info}</p>
          </div>
          <p className="modal__price" aria-label="Precio">
            {item.detail.price}
          </p>
          <p className="modal__address">
            <span className="visually-hidden">Dirección: </span>
            {item.detail.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
