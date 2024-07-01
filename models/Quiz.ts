import mongoose, { Document, Model, Schema } from "mongoose";

export interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface IQuiz extends Document {
    title: string;
    description: string;
    questions: IQuestion[];
    creator: mongoose.Types.ObjectId;
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
