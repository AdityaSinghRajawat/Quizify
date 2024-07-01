import mongoose, { Document, Model, Schema } from "mongoose";

export interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

interface User {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    image: string;
}
export interface IQuiz extends Document {
    title: string;
    description: string;
    questions: IQuestion[];
    creator: User | mongoose.Types.ObjectId;
}

const quizSchema: Schema = new Schema<IQuiz>({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: Number, required: true },
        },
    ],
});

const Quiz: Model<IQuiz> = mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", quizSchema);
export default Quiz;
