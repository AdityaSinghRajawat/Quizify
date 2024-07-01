import Quiz from "@/models/Quiz";
import connectToDb from "@/utils/connectToDb";

interface RouteParams {
    id: string;
}

export const GET = async (request: Request, { params }: { params: RouteParams }) => {
    try {
        await connectToDb();
        const Quizzes = await Quiz.find({
            creator: params.id
        }).populate('creator');

        return Response.json(
            {
                success: true,
                data: Quizzes
            },
            { status: 200 }
        )

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Quizzes could not be fetched'
            },
            { status: 500 }
        )
    }
}