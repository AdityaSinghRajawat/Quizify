"use client"

import Profile from '@/components/Profile'
import { IQuiz } from '@/models/Quiz'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Page = () => {

    const { data: session } = useSession();
    const [allQuizes, setAllQuizes] = useState<IQuiz[]>([]);

    useEffect(() => {

        const fetchQuizes = async () => {
            try {
                const response = await axios.get(`/api/users/${session?.user.id}/quizzes`);
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

    console.log(allQuizes);


    return (
        <>
            <Profile
                name={session?.user.name || ''}
                email={session?.user.email || ''}
                image={session?.user.image || ''}
                allQuizes={allQuizes}
                heading='Your Quizzes'
                setAllQuizes={setAllQuizes}
            />
        </>
    )
}

export default Page