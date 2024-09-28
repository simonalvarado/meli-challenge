import React from "react";
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <ItemList />
      </main>
    </div>
  );
}

export default App;
