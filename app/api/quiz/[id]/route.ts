import connectToDb from "@/utils/connectToDb";
import Quiz from "@/models/Quiz";

interface RouteParams {
    id: string;
}

// GET (read)

export const GET = async (request: Request, { params }: { params: RouteParams }) => {
    try {
        await connectToDb();
        const quiz = await Quiz.findById(params.id).populate('creator');

        if (!quiz) {
            return Response.json(
                {
                    success: false,
                    message: 'Quiz not found'
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: quiz
            },
            { status: 200 }
        );

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Quiz could not be fetched'
            },
            { status: 500 }
        );
    }
}

// PATCH (update)

export const PATCH = async (request: Request, { params }: { params: RouteParams }) => {

    const { creator, title, description, questions } = await request.json();

    try {
        await connectToDb();
        const existingQuiz = await Quiz.findById(params.id);

        if (!existingQuiz) {
            return Response.json(
                {
                    success: false,
                    message: 'Quiz not found'
                },
                { status: 404 }
            );
        }

        existingQuiz.creator = creator
        existingQuiz.title = title;
        existingQuiz.description = description;
        existingQuiz.questions = questions;

        await existingQuiz.save();

        return Response.json(
            {
                success: true,
                message: 'Quiz updated successfully'
            },
            { status: 200 }
        )

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Quiz could not be updated'
            },
            { status: 500 }
        )
    }
}

// DELETE (delete)

export const DELETE = async (request: Request, { params }: { params: RouteParams }) => {

    try {
        await connectToDb();
        await Quiz.findByIdAndDelete(params.id);

        return Response.json(
            {
                success: true,
                message: 'Quiz deleted successfully'
            },
            { status: 200 }
        )

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Quiz could not be deleted'
            },
            { status: 500 }
        )
    }
}