import React from "react";
import { useNavigate } from "react-router-dom";
import Book from "../assets/book.png";
import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";

const HomePage = () => {
  const navigate = useNavigate();

  const startAdventure = () => {
    navigate("/problem/1"); // first problem
  };

  return (
    <div className="app-container">
      {/* LEFT: Characters */}
      <div className="side-images">
        <img src={Boy} alt="Boy" className="boy-img" />
        <img src={Girl} alt="Girl" className="girl-img" />
      </div>

      {/* RIGHT: Book */}
      <div className="book-container">
        <img src={Book} alt="Book" className="book-img" />
        <button onClick={startAdventure} className="start-btn">
          Start Investigation
        </button>
      </div>
    </div>
  );
};

export default HomePage;
