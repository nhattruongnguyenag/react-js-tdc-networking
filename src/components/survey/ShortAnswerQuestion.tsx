import { QuestionProps } from '../../types/Question'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'

export default function ShortAnswerQuestion(props: QuestionProps) {
  return (
    <div className='mt-3 border'>
      <QuestionTitle reviewMode={props.reviewMode} index={props.index} />
      <div className='mb-2 ms-2 mt-1 w-4/12 border-b-2 border-dotted'>
        <input disabled placeholder='Câu trả lời' className='mt-1 w-full bg-gray-100 bg-inherit py-2' />
      </div>
      {Boolean(props.reviewMode) || <QuestionOptions />}
    </div>
  )
}
