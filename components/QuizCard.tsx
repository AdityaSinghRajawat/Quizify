import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Edit, Trash } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { IQuiz } from '@/models/Quiz';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface QuizCardProps {
    quiz: IQuiz,
    allQuizes: IQuiz[],
    setAllQuizes: (quizes: IQuiz[]) => void;
}

const QuizCard = ({ quiz, allQuizes, setAllQuizes }: QuizCardProps) => {

    const router = useRouter();
    const pathName = usePathname();
    const { data: session } = useSession();

    const handleEdit = (quiz: IQuiz) => {
        router.push(`/edit-quiz?id=${quiz._id}`);
    }

    const handleDelete = async (quiz: IQuiz) => {

        try {
            await axios.delete(`/api/quiz/${String(quiz._id).toString()}`);

            const filteredQuizzes = allQuizes.filter((p) => p._id !== quiz._id);

            setAllQuizes(filteredQuizzes);

        } catch (error) {
            console.log(error);
        }
    }

    const handlePlay = (quiz: IQuiz) => {
        router.push(`/play-quiz?id=${quiz._id}`);
    }

    const handleCreatorClick = () => {

        if (String(quiz.creator?._id) === session?.user.id) return router.push("/profile");

        router.push(`/profile/${quiz.creator?._id}?name=${encodeURIComponent(('name' in quiz.creator) ? quiz.creator.name : 'Unknown')}&image=${encodeURIComponent(('image' in quiz.creator) ? quiz.creator.image : '')}`);
    };

    return (
        <Card className="bg-background shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
                <div>
                    <CardTitle className='mb-3'>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                    <p className="text-sm font-semibold text-primary mt-2 cursor-pointer" onClick={handleCreatorClick}>
                        Created by: {(quiz.creator && 'name' in quiz.creator) ? quiz.creator.name : 'Unknown'}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <Button onClick={() => handlePlay(quiz)}>Play Now</Button>
                {session?.user?.id === String(quiz.creator?._id) && pathName === '/profile' && (
                    <div className="flex space-x-2">

                        <Button variant="ghost" className="p-2" aria-label="Edit" onClick={() => handleEdit(quiz)}>
                            <Edit className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant="ghost" className="p-2" aria-label="Delete">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your Quiz
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(quiz)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>


                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default QuizCard;
