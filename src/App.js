import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/search" element={<ItemList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
