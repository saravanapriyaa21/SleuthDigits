import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function parseUserInput(input) {
  if (input == null) return null;
  const s = String(input).trim();

  if (s === "") return null;

  if (s.endsWith("%")) {
    const num = parseFloat(s.slice(0, -1));
    if (!isNaN(num)) return num / 100;
  }

  if (s.includes("/")) {
    const parts = s.split("/");
    if (parts.length === 2) {
      const a = parseFloat(parts[0].trim());
      const b = parseFloat(parts[1].trim());
      if (!isNaN(a) && !isNaN(b) && b !== 0) return a / b;
    }
  }

  const n = parseFloat(s);
  if (!isNaN(n)) return n;

  return s.toLowerCase();
}

export default function ProblemsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problemsData, setProblemsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [attempted, setAttempted] = useState(false);

  // Fetch problems from backend
  useEffect(() => {
    fetch("https://sleuthdigits.onrender.com/api/problems")
      .then((res) => res.json())
      .then((data) => {
        setProblemsData(data);

        if (id) {
          const idx = data.findIndex((p) => p.id === parseInt(id));
          setCurrentIndex(idx >= 0 ? idx : 0);
        } else {
          setCurrentIndex(0);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const currentProblem = problemsData[currentIndex];
  if (!currentProblem)
    return (
      <div className="problem-container">
        <h2>Loading...</h2>
      </div>
    );

  const checkAnswer = () => {
    const parsed = parseUserInput(userAnswer);
    if (parsed === null) {
      setFeedback({ ok: false, text: "Please enter an answer" });
      return;
    }

    const correct = currentProblem.answer;
    let isCorrect = false;

    if (typeof correct === "number" && typeof parsed === "number") {
      const tol = Math.max(0.02, Math.abs(correct) * 0.02);
      if (Math.abs(parsed - correct) <= tol) isCorrect = true;
    } else {
      if (String(parsed).toLowerCase() === String(correct).toLowerCase())
        isCorrect = true;
    }

    setAttempted(true);

    if (isCorrect) {
      setFeedback({ ok: true, text: `✅ Correct! ${currentProblem.explanation}` });
      setStreak((s) => s + 1);

      setSolvedProblems((prev) =>
        prev.includes(currentProblem.id) ? prev : [...prev, currentProblem.id]
      );
    } else {
      setFeedback({ ok: false, text: `❌ Not quite. ${currentProblem.explanation}` });
      setStreak(0);
    }
  };

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < problemsData.length) {
      setCurrentIndex(nextIndex);
      setUserAnswer("");
      setFeedback(null);
      setShowHint(false);
      setAttempted(false);
      navigate(`/problem/${problemsData[nextIndex].id}`, { replace: false });
    } else {
      if (solvedProblems.length === problemsData.length) {
        setFeedback({
          ok: true,
          text: "🎉 All Cases are Solved! You finished all the problems!",
        });
      } else {
        setFeedback({
          ok: false,
          text: "You reached the end. Some problems are not solved yet!",
        });
      }
    }
  };

  const goBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setUserAnswer("");
      setFeedback(null);
      setShowHint(false);
      setAttempted(false);
      navigate(`/problem/${problemsData[prevIndex].id}`, { replace: false });
    }
  };

  const handleHint = () => setShowHint(true);
  const percentSolved = Math.round((solvedProblems.length / problemsData.length) * 100);

  return (
    <div className="problem-page-root">
      <div className="progress-row">
        <div className="progress-bar-outer" aria-hidden>
          <div className="progress-bar-inner" style={{ width: `${percentSolved}%` }} />
        </div>
        <div className="streak-badge">🔥 Streak: {streak}</div>
      </div>

      <div className="problem-card">
        <div className="image-wrap">
          <img
            src={`https://sleuthdigits.onrender.com${currentProblem.image}`}
            alt={`case-${currentProblem.id}`}
            className="case-image"
          />
        </div>

        <div className="problem-content">
          <h2>Case Clue {currentProblem.id}</h2>
          <p className="question">{currentProblem.question}</p>

          <div className="answer-row">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer"
              className="answer-input"
            />
            <button onClick={checkAnswer} className="check-btn">
              Check
            </button>
            <button onClick={handleHint} className="hint-btn">
              Hint
            </button>
          </div>

          {showHint && (
            <div className="hint-box">
              <strong>Clue:</strong> {currentProblem.hint}
            </div>
          )}

          {feedback && (
            <div className={`feedback ${feedback.ok ? "correct" : "wrong"}`}>
              {feedback.text}
            </div>
          )}

          <div className="controls-row">
            <button
              onClick={goBack}
              className="next-btn"
              disabled={currentIndex === 0}
            >
              ⬅ Back Problem
            </button>
            <button onClick={goNext} className="next-btn">
              Next Problem ➡
            </button>
          </div>

          <div className="meta-row">
            <small>
              {solvedProblems.length}/{problemsData.length} solved
            </small>
            {attempted && !feedback?.ok && (
              <small className="try-note">
                Tip: try another format (fraction or %)
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
