import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../assets/mercado-libre.png";
import "./Header.scss";

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/">
          <img src={logo} alt="Mercado Libre" className="header__logo" />
        </Link>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
