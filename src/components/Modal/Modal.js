import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner.js";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      setImageLoaded(false); // Reset image loaded state when modal opens
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__wrapper">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <div className="modal__image-wrapper">
          {!imageLoaded && <Spinner />}
          <img
            src={item.image}
            alt={item.title}
            className={`modal__image ${imageLoaded ? "modal__image--loaded" : ""}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="modal__content">
          <h1 className="modal__title">{item.title}</h1>
          <p className="modal__description">{item.description}</p>
          <div className="modal__info-wrapper">
            <h3 className="modal__info-subtitle">Información del producto</h3>
            <p className="modal__info">{item.detail.info}</p>
          </div>
          <p className="modal__price">{item.detail.price}</p>
          <p className="modal__address">Dirección: {item.detail.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
