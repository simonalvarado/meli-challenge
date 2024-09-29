import React from "react";
import Header from "./components/Header/Header.js";
import ItemList from "./components/ItemList/ItemList.js";
import { SearchProvider } from "./context/SearchContext.js";
import "./App.scss";

function App() {
  return (
    <SearchProvider>
      <div className="app">
        <Header />
        <main className="app__main">
          <ItemList />
        </main>
      </div>
    </SearchProvider>
  );
}

export default App;
