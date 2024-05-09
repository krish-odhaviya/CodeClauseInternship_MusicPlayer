import React, { useState } from "react";
import "./Header.css";

function Header({ getTrack }) {
  const [search, setSearch] = useState("");
  return (
    <header>
      <h3 className="title">Music Player</h3>
      <input
        className="inp"
        type="text"
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
      />
      <button id="bottone1" onClick={() => getTrack(search)}>
        <strong>Search</strong>
      </button>
    </header>
  );
}

export default Header;
