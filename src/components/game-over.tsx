import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface GameOverProps {
  onRestart: () => void;
  score: number;
  totalQuestions: number;
}

export default function GameOver({ onRestart, score, totalQuestions }: GameOverProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-500 to-orange-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md"
      >
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        </motion.div>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Game Over!
        </motion.h2>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-gray-600"
        >
          Final Score: {score}/{totalQuestions}
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-2 text-gray-500"
        >
          ({percentage}% correct)
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRestart}
          className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
}
