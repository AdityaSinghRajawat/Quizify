"use client";

import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from 'lucide-react';
import QuizCard from './QuizCard';
import { IQuiz } from '@/models/Quiz';

type ProfileProps = {
    name: string;
    email: string;
    image: string;
    allQuizes: IQuiz[],
    heading: string
};

const Profile = ({ name, email, image, allQuizes, heading }: ProfileProps) => {

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={image} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-muted-foreground">{email}</p>
                </div>
            </div>
            <Separator className="my-8" />
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{heading}</h2>
                {email.length > 0 && <Link href='/create-quiz'>
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Quiz
                    </Button>
                </Link>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {allQuizes?.map((quiz, index) => (
                    <QuizCard key={index} quiz={quiz} />
                ))}
            </div>
        </div>
    )
}

export default Profile;
