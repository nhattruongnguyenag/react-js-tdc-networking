import { QuestionProps } from '../../types/Question'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'

export default function ShortAnswerQuestion(props: QuestionProps) {
    return (
        <div className='border mt-3'>
            <QuestionTitle
                reviewMode={props.reviewMode}
                index={props.index} />
            <div className='ms-2 border-dotted border-b-2 w-4/12 mb-2 mt-1'>
                <input disabled placeholder='Câu trả lời' className='w-full bg-gray-100 bg-inherit py-2 mt-1' />
            </div>
            {
                Boolean(props.reviewMode) ||
                <QuestionOptions />
            }
        </div>
    )
}
