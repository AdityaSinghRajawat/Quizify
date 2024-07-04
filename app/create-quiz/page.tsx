"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { QuizSchema } from "@/schemas";
import { QuizFormData, Question } from "@/interfaces";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();

    const { register, handleSubmit, control, setValue } = useForm<QuizFormData>({
        resolver: zodResolver(QuizSchema),
        defaultValues: {
            title: "",
            description: "",
            questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
        },
    });

    const [questions, setQuestions] = useState<Question[]>([
        { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);

    const onSubmit = async (values: z.infer<typeof QuizSchema>) => {
        try {
            const response = await axios.post("/api/quiz", {
                creator: session?.user.id,
                title: values.title,
                description: values.description,
                questions: values.questions,
            });

            if (response.status === 201) {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
        };
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions, newQuestion];
            setValue("questions", updatedQuestions);
            return updatedQuestions;
        });
    };

    const removeQuestion = (index: number) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = prevQuestions.filter((_, i) => i !== index);
            setValue("questions", updatedQuestions);
            return updatedQuestions;
        });
    };

    const updateQuestion = (index: number, field: keyof Question, value: string | number | string[]) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = prevQuestions.map((q, i) =>
                i === index ? { ...q, [field]: value } : q
            );
            setValue("questions", updatedQuestions);
            return updatedQuestions;
        });
    };

    return (
        <div className="container mx-auto mt-20 p-4 sm:p-6 md:p-8">
            <Card className="w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Create a Quiz</CardTitle>
                    <CardDescription>Fill out the form below to create a new quiz.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Quiz Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter the quiz title"
                                    {...register("title")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter a description for the quiz"
                                    {...register("description")}
                                />
                            </div>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Questions</h3>
                                    <Button type="button" onClick={addQuestion}>
                                        Add Question
                                    </Button>
                                </div>
                                {questions.map((question, index) => (
                                    <div key={index} className="grid gap-4 border-t pt-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`questions[${index}].text`}>
                                                Question {index + 1}
                                            </Label>
                                            <Input
                                                id={`questions[${index}].text`}
                                                type="text"
                                                placeholder="Enter the question text"
                                                value={question.question}
                                                onChange={(e) =>
                                                    updateQuestion(index, "question", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Options</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {question.options.map((option, optionIndex) => (
                                                    <Input
                                                        key={optionIndex}
                                                        type="text"
                                                        placeholder={`Option ${optionIndex + 1}`}
                                                        value={option}
                                                        onChange={(e) => {
                                                            const updatedOptions = [...question.options];
                                                            updatedOptions[optionIndex] =
                                                                e.target.value;
                                                            updateQuestion(
                                                                index,
                                                                "options",
                                                                updatedOptions
                                                            );
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`questions[${index}].correct`}>
                                                Correct Answer
                                            </Label>
                                            <Controller
                                                control={control}
                                                name={`questions.${index}.correctAnswer`}
                                                render={({ field }) => (
                                                    <Select
                                                        value={field.value.toString()}
                                                        onValueChange={(value) =>
                                                            field.onChange(parseInt(value))
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select correct answer" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {question.options.map(
                                                                (_, optionIndex) => (
                                                                    <SelectItem
                                                                        key={optionIndex}
                                                                        value={optionIndex.toString()}
                                                                    >
                                                                        Option {optionIndex + 1}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            type="button"
                                            onClick={() => removeQuestion(index)}
                                            className="justify-start"
                                        >
                                            Remove Question
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button type="submit">Create Quiz</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
