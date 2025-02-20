import { motion } from "framer-motion";

interface StartScreenProps {
  onStart: () => void;
  issue: string;
  setIssue: (issue: string) => void;
}

export default function StartScreen({ onStart, issue, setIssue }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-500 to-teal-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Bienvenido a QuizGame
        </motion.h2>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-600 mb-4"
        >
          Ingresa un tema para generar preguntas:
        </motion.p>
        <motion.input
          type="text"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Ejemplo: matemáticas, historia..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onStart}
          className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Comenzar Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}
