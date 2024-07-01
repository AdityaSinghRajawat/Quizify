"use client";

import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
}

interface Quiz {
    questions: Question[];
    title: string;
    description: string;
}

const QuizContent = ({ quizId }: { quizId: string | null }) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    useEffect(() => {
        const getQuizDetails = async () => {
            if (quizId) {
                try {
                    const response = await axios.get(`/api/quiz/${quizId}`);
                    setQuiz(response.data.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        getQuizDetails();
    }, [quizId]);

    const questions = quiz?.questions || [];

    const handleAnswerSelect = (index: number) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestion] = index;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowResult(false);
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    const calculatePercentage = () => {
        const score = calculateScore();
        return (score / questions.length) * 100;
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">{quiz?.title}</h1>
            <p className="text-muted-foreground">{quiz?.description}</p>
            <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
            </p>
            {quiz && questions.length > 0 ? (
                !showResult ? (
                    <div className="space-y-6 mt-8">
                        <div>
                            <h2 className="text-lg font-bold">{questions[currentQuestion].question}</h2>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <Button
                                        key={index}
                                        className={`rounded-lg px-4 py-2 text-left transition-colors 
                                             ${selectedAnswers[currentQuestion] === index ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
                                        onClick={() => handleAnswerSelect(index)}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            {selectedAnswers[currentQuestion] !== undefined && (
                                <Button onClick={handleNextQuestion}>
                                    {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 mt-8">
                        <h2 className="text-lg font-bold">
                            You scored {calculateScore()} out of {questions.length} ({calculatePercentage().toFixed(2)}%)
                        </h2>
                        <p className="text-muted-foreground">Thank you for completing the quiz!</p>
                        <div className="flex justify-end">
                            <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
                        </div>
                    </div>
                )
            ) : (
                <p className="text-muted-foreground">Loading...</p>
            )}
        </div>
    );
};

export default function Page() {
    const searchParams = useSearchParams();
    const quizId = searchParams.get("id");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-background rounded-lg border p-12 w-full max-w-2xl mx-auto">
                <Suspense fallback={<div>Loading quiz details...</div>}>
                    <QuizContent quizId={quizId} />
                </Suspense>
            </div>
        </div>
    );
}
