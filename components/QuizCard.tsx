import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface QuizCardProps {
    title: string;
    description: string;
}

const QuizCard = ({ title, description }: QuizCardProps) => {
    return (
        <Card className="bg-background shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>Play Now</Button>
            </CardContent>
        </Card>
    )
}

export default QuizCard