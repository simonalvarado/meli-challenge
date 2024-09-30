import React, { forwardRef, useState } from "react";
import Button from "../Button/Button.js";
import Modal from "../Modal/Modal.js";
import "./Card.scss";

const Card = forwardRef(({ item }, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <li ref={ref} className="card">
        <div className="card__wrapper">
          <div className="card__image-wrapper">
            {!imageLoaded && <div className="card__image-placeholder" />}
            <img
              src={item.image}
              alt={item.title}
              className={`card__image ${imageLoaded ? "card__image--loaded" : ""}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="card__content">
            <h2 className="card__title">{item.title}</h2>
            <p className="card__description">{item.description}</p>
            <p className="card__price">{item.detail.price}</p>
            <div className="card__button-wrapper">
              <Button
                onClick={() => setShowModal(true)}
                className="card__button"
              >
                Ver detalles
              </Button>
            </div>
          </div>
        </div>
      </li>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={item}
      />
    </>
  );
});

export default Card;
