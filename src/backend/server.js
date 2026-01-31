// src/backend/server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5050; 

app.use(cors());
app.use(express.json());

// Serve images from the backend images folder
app.use("/images", express.static("images"));

const problemsData = [
  {
    id: 1,
    image: "/images/problem1.png",
    question: "The thief escaped in a car driving at 60 km/h for 2 hours. How far did he get?",
    answer: 120,
    explanation: "Detective’s Note: Distance = Speed × Time = 60 × 2 = 120 km. That’s how far the thief is from the crime scene!",
    hint: "Clue 🔎: Think—every hour he covers 60 km. In 2 hours, it’s just double that!"
  },
  {
    id: 2,
    image: "/images/problem2.png",
    question: "A strange poison mixture was found. Ratio is 2:3 (poison:water). If total is 50 ml, how much is poison?",
    answer: 20,
    explanation: "Detective’s Note: Total parts = 2 + 3 = 5. Poison = (2/5) × 50 = 20 ml. That’s the dangerous amount hidden in the mixture!",
    hint: "Clue 🧴: Break the mixture into 5 equal parts. How many belong to poison?"
  },
  {
    id: 3,
    image: "/images/problem3.png",
    question: "CCTV shows the suspect left at 4:00 PM and reached a shop 15 km away at 4:30 PM. What speed was he driving?",
    answer: 30,
    explanation: "Detective’s Note: Time = 0.5 hr. Speed = 15 ÷ 0.5 = 30 km/h. That’s the speed of his getaway vehicle!",
    hint: "Clue ⏱️: 30 minutes = 0.5 hours. Now divide distance by time."
  },
  {
    id: 4,
    image: "/images/problem4.png",
    question: "Detectives found 3 suspects’ fingerprints. The chance of matching one at random is 1/5. What’s the probability none of the 3 match?",
    answer: 0.512,
    explanation: "Detective’s Note: Prob(no match) = (4/5)³ = 64/125 = 0.512. Seems like luck isn’t on their side!",
    hint: "Clue 🧤: If 1/5 matches, then 4/5 doesn’t. Raise (4/5) to the power of 3 suspects."
  },
  {
    id: 5,
    image: "/images/problem5.png",
    question: "Each step the burglar takes is 0.75 m long. If 200 steps were counted, how far did he walk?",
    answer: 150,
    explanation: "Detective’s Note: Distance = 200 × 0.75 = 150 m. The burglar left footprints leading us right to the clue!",
    hint: "Clue 👟: Multiply each step length by total steps. Follow the footprints!"
  },
  {
    id: 6,
    image: "/images/problem6.png",
    question: "Detective checks 12 houses per hour. How many hours to check 96 houses?",
    answer: 8,
    explanation: "Detective’s Note: Time = 96 ÷ 12 = 8 hours. That’s a full day’s work for the detective!",
    hint: "Clue 🔦: Divide total houses by houses checked per hour."
  }
];

// API endpoints
app.get("/api/problems", (req, res) => res.json(problemsData));
app.get("/api/problems/:id", (req, res) => {
  const problem = problemsData.find(p => p.id === parseInt(req.params.id));
  if (!problem) return res.status(404).json({ error: "Problem not found" });
  res.json(problem);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
