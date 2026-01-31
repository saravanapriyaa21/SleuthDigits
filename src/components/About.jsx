import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div className="about-page">
        <h1>Welcome to SleuthDigits!</h1>
        <p>
          SleuthDigits is a fun and exciting math detective game for kids! 
          Solve tricky cases, follow the clues, and catch the mischievous
          thieves and burglars by using your math skills. 🔍
        </p>

        <h2>How to Play</h2>
        <ul>
          <li>Each case gives you a problem to solve.</li>
          <li>Type your answer in the box and click "Check". ✅</li>
          <li>If you get stuck, click "Hint" for a little clue. 💡</li>
          <li>Keep your streak going and solve all the cases! 🔥</li>
        </ul>

        <h2>Why It’s Fun</h2>
        <p>
          Math becomes an adventure! You'll practice numbers, fractions, and
          problem-solving while feeling like a real detective. 
        </p>

        <p>
          So grab your detective hat and let’s start solving some mysteries!
        </p>
      </div>
    );
  }
}
