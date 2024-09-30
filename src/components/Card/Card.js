import React, { forwardRef } from "react";
import "./Card.scss";

const Card = forwardRef(({ item }, ref) => {
  return (
    <li ref={ref} className="card">
      <div className="card__wrapper">
        <div className="card__image-wrapper">
          <img src={item.image} alt={item.title} className="card__image" />
        </div>
        <div className="card__content">
          <h2 className="card__title">{item.title}</h2>
          <p className="card__description">{item.description}</p>
          <p className="card__price">{item.detail.price}</p>
          <div className="card__button-wrapper">
            <button className="card__button">Ver detalles</button>
          </div>
        </div>
      </div>
    </li>
  );
});

export default Card;
