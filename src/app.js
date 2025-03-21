import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Howl } from 'howler';
import Confetti from 'react-confetti';
import Draggable from 'react-draggable';

const gradeButtons = [
  { name: "Mini KG", icon: "🐰", param: "mini", color: "#FFB5E8" },
  { name: "Junior KG", icon: "🐶", param: "junior", color: "#AFF8D8" },
  { name: "Senior KG", icon: "🎓", param: "senior", color: "#FFE4AE" },
];

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Learn Your ABCs! 🎈</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gradeButtons.map((grade) => (
          <button
            key={grade.param}
            onClick={() => navigate(`/game/${grade.param}`)}
            className="p-6 rounded-2xl text-xl font-bold text-gray-900 border-4 border-gray-900"
            style={{ backgroundColor: grade.color }}
          >
            {grade.icon} {grade.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Game() {
  const { grade } = useParams();
  const [answer, setAnswer] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const correctAnswer = "A"; // Example question for all grades

  const playSound = () => {
    const sound = new Howl({ src: ["/audio/a.mp3"] });
    sound.play();
  };

  const checkAnswer = () => {
    if (answer.toUpperCase() === correctAnswer) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      alert("Correct! 🎉");
    } else {
      alert("Try Again! ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {showConfetti && <Confetti />}
      <h1 className="text-3xl font-bold">{grade.toUpperCase()} KG Game 🎮</h1>
      <p className="mt-4 text-xl">Drag and match the letter A!</p>
      <Draggable>
        <div className="p-4 bg-blue-300 rounded-full text-3xl cursor-pointer">A</div>
      </Draggable>
      <div className="border-2 border-gray-900 p-6 mt-4 text-xl font-bold">Drop A Here</div>
      <button onClick={playSound} className="p-2 bg-yellow-400 rounded mt-2">🔊 Listen</button>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="mt-2 p-2 border-2 border-gray-900"
      />
      <button
        onClick={checkAnswer}
        className="mt-4 p-3 bg-blue-500 text-white font-bold rounded"
      >
        Submit
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:grade" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
