import OpenAI from "openai";

interface QuizGameConfig {
  issue: string;
  questions: number;
  answers: number;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || "",
  dangerouslyAllowBrowser: true, 
});

export async function QuizGenerateAI({ issue, questions, answers }: QuizGameConfig): Promise<Question[]> {

  const completion = await openai.chat.completions.create({
    messages: [{
      role: "system",
      content: `Generate a quiz on "${issue}" with ${questions} questions and ${answers} possible answers per question (only 1 correct).
      Return ONLY a valid JSON array, properly formatted, without additional text or explanations.
      Example:
      [{"question": "What is 2+2?", "options": ["3", "4", "5", "6"], "correct": 1}]`
    }],
    model: "deepseek/deepseek-chat:free",
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No content received from the API");
  }

  try {
    const trimmedContent = content.trim();

    // Validación para asegurarnos de que es un JSON válido
    if (!trimmedContent.startsWith("[") || !trimmedContent.endsWith("]")) {
      console.error("Unexpected API response:", trimmedContent);
      throw new Error("API response is not a valid JSON array");
    }

    const generatedQuestions: Question[] = JSON.parse(trimmedContent);

    // Validación de estructura esperada
    if (!Array.isArray(generatedQuestions) || generatedQuestions.some(q => !q.question || !q.options || q.correct === undefined)) {
      throw new Error("JSON response is not in expected format");
    }

    console.log("Generated questions:", generatedQuestions);
    return generatedQuestions;
  } catch (error) {
    console.error("Error parsing JSON from API:", error);
    throw new Error("Invalid JSON response from API");
  }
}
