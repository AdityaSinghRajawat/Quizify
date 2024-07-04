"use client";

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import QuizCard from "@/components/QuizCard"
import { useEffect, useState } from "react"
import axios from "axios";
import { IQuiz } from "@/models/Quiz";

export default function Page() {

  const categories = [
    {
      name: "Arts & Culture",
      icon: "🎨"
    },
    {
      name: "Science",
      icon: "🔬"
    },
    {
      name: "Brain Teasers",
      icon: "🧠"
    },
    {
      name: "Geography",
      icon: "🌍"
    },
    {
      name: "Literature",
      icon: "📚"
    },
    {
      name: "Entertainment",
      icon: "🎮"
    },
  ]

  const [allQuizes, setAllQuizes] = useState<IQuiz[]>([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>();
  const [searchedResults, setSearchedResults] = useState<IQuiz[]>([]);

  useEffect(() => {

    const fetchQuizes = async () => {
      try {
        const response = await axios.get('/api/quiz');
        const data = await response.data;

        // setAllQuizes(Array.isArray(data.data) ? data.data : []);
        setAllQuizes(data.data)

      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
        setAllQuizes([]);
      }
    }

    fetchQuizes();

  }, []);


  const filterQuizes = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allQuizes?.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.description) ||
        regex.test(item.questions[0].question)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuizes(searchText);
        setSearchedResults(searchResult);
      }, 500) as unknown as number // Explicitly cast to number
    );
  };

  const handleCategoryClick = (category: string) => {
    setSearchText(category);

    const searchResult = filterQuizes(category);
    setSearchedResults(searchResult);
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">

      <main className="flex-1">

        <section
          className="w-full h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/cube.jpg")' }}
        >
          <div className="container px-4 md:px-6 text-center h-full flex flex-col justify-center items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
                Unlock Your Knowledge with Quizler
              </h1>
              <p className="max-w-[700px] mx-auto text-primary-foreground/80 md:text-xl">
                Discover a world of engaging quizzes, test your skills, and challenge yourself across a variety of
                topics.
              </p>
              <div className="flex justify-center">
                <Link
                  href="#search"
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
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href="#search"
                  className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
                  prefetch={false}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-3xl text-primary-foreground">
                    {category.icon}
                  </div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">{category.name}</div>
                </Link>
              ))}

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
              <form className="flex gap-2" onSubmit={handleSearchSubmit}>
                <Input
                  type="text"
                  placeholder="Search for quizzes"
                  className="flex-1"
                  value={searchText}
                  onChange={handleSearchChange}
                />
                <Button type="submit">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12" id="search">

              {searchedResults?.length !== 0 ? (
                searchedResults?.map((quiz, index) => (
                  <QuizCard key={index} quiz={quiz} allQuizes={allQuizes} setAllQuizes={setAllQuizes} />
                ))
              ) : (
                allQuizes?.map((quiz, index) => (
                  <QuizCard key={index} quiz={quiz} allQuizes={allQuizes} setAllQuizes={setAllQuizes} />
                ))
              )}

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

