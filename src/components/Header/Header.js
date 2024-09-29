import React from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import logo from "../../assets/mercado-libre.png";
import "./Header.scss";

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <div className="header__content">
        <img src={logo} alt="Mercado Libre" className="header__logo" />
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
