export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface QuizFormData {
    title: string;
    description: string;
    questions: Question[];
}