import Quiz from "@/models/Quiz";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from 'next/server';

export const GET = async () => {

    await connectToDb();

    try {

        const allQuizzes = await Quiz.find({}).populate('creator');
        return NextResponse.json({
            success: true,
            data: allQuizzes
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Quizzes could not be fetched'
        }, { status: 500 });
    }
}

export const POST = async (request: Request) => {

    await connectToDb();

    try {

        const { creator, title, description, questions } = await request.json();

        const newQuiz = new Quiz({
            creator,
            title,
            description,
            questions
        });

        await newQuiz.save();

        return NextResponse.json({
            success: true,
            message: 'Quiz created successfully'
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Quiz could not be saved'
        }, { status: 500 });
    }
}
