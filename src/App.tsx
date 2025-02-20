import { useEffect, useState } from "react";
import GameOver from "./components/game-over";
import QuestionCard from "./components/question-card";
import StartScreen from "./components/start-screen";
import Timer from "./components/timer";
import { GameState, Question } from "./types/quiz";
import { QuizGenerateAI } from "./utils/deepseek";

function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [issue, setIssue] = useState<string>("");

  useEffect(() => {
    if (gameState !== "playing" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing") {
      setGameState("end");
    }
  }, [timeLeft, gameState]);

  const handleStart = async () => {
    if (!issue.trim()) {
      alert("Por favor ingresa un tema antes de comenzar.");
      return;
    }

    setGameState("loading");
    try {
      const generatedQuestions = await QuizGenerateAI({
        issue: issue,
        questions: 5,
        answers: 4,
      });
      setQuestions(generatedQuestions);
      setGameState("playing");
      resetGame();
    } catch (error) {
      console.error("Error generating questions:", error);
      setGameState("start");
      alert("Error al generar preguntas. Inténtalo de nuevo.");
    }
  };

  const resetGame = () => {
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setGameState("end");
      }
    }, 1500);
  };

  return (
    <div className="mx-auto h-screen w-full shadow-md overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
      {gameState === "start" && <StartScreen onStart={handleStart} issue={issue} setIssue={setIssue} />}
      {gameState === "loading" && (
        <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gray-100">
          <p className="text-gray-600 text-lg font-medium animate-pulse">
            Generando preguntas...
          </p>
        </div>
      )}
      {gameState === "playing" && questions.length > 0 && (
        <div className="flex flex-col items-center py-6">
          <Timer timeLeft={timeLeft} />
          <QuestionCard
            question={questions[currentQuestion]}
            onAnswerSelect={handleAnswer}
            selectedAnswer={selectedAnswer}
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
          />
          <div className="mt-6 text-center text-gray-600">
            Score: {score}/{questions.length}
          </div>
        </div>
      )}
      {gameState === "end" && (
        <GameOver
          score={score}
          totalQuestions={questions.length}
          onRestart={handleStart}
        />
      )}
    </div>
  );
}

export default App;
