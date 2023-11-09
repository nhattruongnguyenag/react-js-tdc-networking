import { QuestionProps } from '../../types/Question'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'

interface ShortAnswerQuestionProps extends QuestionProps {
  onAnswerChangeText?: (value: string) => void
}

export default function ShortAnswerQuestion(props: ShortAnswerQuestionProps) {
  return (
    <div className='mt-3 border'>
      <QuestionTitle
        editMode={props.editMode}
        conductMode={props.conductMode}
        reviewMode={props.reviewMode}
        index={props.index} />
      <div className='ms-2 mb-2 mt-1 me-2 border-b-2 border-dotted'>
        <input
          onChange={(event) => props.onAnswerChangeText && props.onAnswerChangeText(event.target.value)}
          disabled={!Boolean(props.conductMode)}
          placeholder='Câu trả lời'
          className='pr-3 w-full bg-gray-100 bg-inherit py-2' />
      </div>
      {Boolean(props.editMode) && <QuestionOptions index={props.index} />}
    </div>
  )
}
