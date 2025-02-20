import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Question } from "../types/quiz";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  totalQuestions: number;
  currentQuestion: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  totalQuestions,
  currentQuestion,
}: QuestionCardProps) {
  const getButtonClass = (index: number): string => {
    if (selectedAnswer === null) return "hover:bg-gray-100";
    if (index === question.correct) return "bg-green-100 border-green-500";
    if (selectedAnswer === index) return "bg-red-100 border-red-500";
    return "opacity-50";
  };

  return (
    <div className="flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl font-semibold text-gray-800 mb-2"
        >
          Question {currentQuestion + 1} of {totalQuestions}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-600 mb-4"
        >
          {question.question}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => selectedAnswer === null && onAnswerSelect(index)}
              className={`w-full p-4 text-left border rounded-lg transition-all duration-300 flex justify-between items-center ${getButtonClass(
                index
              )}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={selectedAnswer === index}
            >
              <span>{option}</span>
              {selectedAnswer !== null && index === question.correct && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {selectedAnswer === index && index !== question.correct && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
