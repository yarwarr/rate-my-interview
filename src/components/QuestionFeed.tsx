import { FC } from 'react'
import { Question } from '../../db'

interface QuestionFeedProps {
    questions: any
}

const QuestionFeed: FC<QuestionFeedProps> = ({ questions }) => {
    console.log(questions)
    return <div>
        <h2>Questions:</h2>
        <ul>
            {questions.map((question: any, index: any) => (
                <li key={question.id}>
                    {`${index + 1}. ${question.questions.text}`}
                </li>
            ))}
        </ul>
    </div>
}

export default QuestionFeed;