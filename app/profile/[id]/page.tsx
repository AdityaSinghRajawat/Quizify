"use client"

import Profile from '@/components/Profile'
import { IQuiz } from '@/models/Quiz'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Params {
    id: string;
}

const Page = ({ params }: { params: Params }) => {

    const searchParams = useSearchParams();

    const [allQuizes, setAllQuizes] = useState<IQuiz[]>([]);

    const userId = params?.id
    const name = searchParams.get("name");
    const image = searchParams.get("image");

    console.log(name);
    console.log(image);

    useEffect(() => {
        const fetchQuizes = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}/quizzes`);
                const data = await response.data;

                setAllQuizes(data.data);
            } catch (error) {
                console.error("Failed to fetch quizzes:", error);
                setAllQuizes([]);
            }
        };

        if (userId) {
            fetchQuizes();
        }
    }, [userId]);


    console.log(allQuizes);


    return (
        <>
            <Profile
                name={name || ''}
                email={''}
                image={image || ''}
                allQuizes={allQuizes}
                heading={`${name} Quizzes`}
                setAllQuizes={setAllQuizes}
            />
        </>
    )
}

export default Page;