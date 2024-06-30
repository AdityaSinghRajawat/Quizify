"use client";

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import QuizCard from "@/components/QuizCard"
import { useEffect, useState } from "react"
import { QuizFormData } from "@/interfaces";
import axios from "axios";

export default function Page() {

  const Quizes = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  const [allQuizes, setAllQuizes] = useState<QuizFormData[]>([]);

  useEffect(() => {

    const fetchQuizes = async () => {
      const response = await axios.get('/api/quiz');
      const data = await response.data;

      setAllQuizes(data.data);
    }

    fetchQuizes();

  }, []);

  console.log(allQuizes);


  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section
          className="w-full h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/quiz.webp")' }}
        >
          <div className="container px-4 md:px-6 text-center h-full flex flex-col justify-center items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
                Unlock Your Knowledge with Quizify
              </h1>
              <p className="max-w-[700px] mx-auto text-primary-foreground/80 md:text-xl">
                Discover a world of engaging quizzes, test your skills, and challenge yourself across a variety of
                topics.
              </p>
              <div className="flex justify-center">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Start Quizzing
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Quiz Categories</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Browse through a wide range of quiz categories and find the ones that pique your interest.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
              <Link
                href="#"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                prefetch={false}
              >
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-3xl text-primary-foreground">
                  🎨
                </div>
                <div className="text-sm font-medium group-hover:text-primary transition-colors">Arts &amp; Culture</div>
              </Link>
              <Link
                href="#"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                prefetch={false}
              >
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-3xl text-primary-foreground">
                  🔬
                </div>
                <div className="text-sm font-medium group-hover:text-primary transition-colors">Science</div>
              </Link>
              <Link
                href="#"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                prefetch={false}
              >
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-3xl text-primary-foreground">
                  🧠
                </div>
                <div className="text-sm font-medium group-hover:text-primary transition-colors">Brain Teasers</div>
              </Link>
              <Link
                href="#"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                prefetch={false}
              >
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-3xl text-primary-foreground">
                  🌍
                </div>
                <div className="text-sm font-medium group-hover:text-primary transition-colors">Geography</div>
              </Link>
              <Link
                href="#"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                prefetch={false}
              >
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-3xl text-primary-foreground">
                  📚
                </div>
                <div className="text-sm font-medium group-hover:text-primary transition-colors">Literature</div>
              </Link>
              <Link
                href="#"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                prefetch={false}
              >
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-3xl text-primary-foreground">
                  🎮
                </div>
                <div className="text-sm font-medium group-hover:text-primary transition-colors">Entertainment</div>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Your Next Quiz</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Search through our extensive library of quizzes and find the ones that match your interests.
              </p>
            </div>
            <div className="mx-auto max-w-md mt-8">
              <form className="flex gap-2">
                <Input type="text" placeholder="Search for quizzes" className="flex-1" />
                <Button type="submit">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              {allQuizes.map((quiz, index) => (
                <QuizCard key={index} title={quiz.title} description={quiz.description} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Quizify. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

