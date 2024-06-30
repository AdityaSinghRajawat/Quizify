import { z } from "zod";

// Define the schema for a single question
const QuestionSchema = z.object({
    question: z.string().min(1, "Question text is required"),
    options: z.array(z.string().min(1, "Option text is required")).length(4, "Each question must have exactly 4 options"),
    correctAnswer: z.number().int().min(0, "Correct answer index must be between 1 and 4").max(3, "Correct answer index must be between 1 and 4"),
});

// Define the schema for the entire quiz
const QuizSchema = z.object({
    title: z.string().min(1, "Quiz title is required"),
    description: z.string().min(1, "Description is required"),
    questions: z.array(QuestionSchema).min(1, "Quiz must have at least one question"),
});

// Example usage
const exampleQuiz = {
    title: "Sample Quiz",
    description: "This is a sample quiz description",
    questions: [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswer: 1,
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 2,
        },
    ],
};

export { QuizSchema, QuestionSchema };
