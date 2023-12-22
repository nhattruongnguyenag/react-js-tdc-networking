import { SHORT_ANSWER_QUESTION_COMPONENT_TITLE_PLACEHOLDER } from '../../constants/StringVietnamese'
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
        questionIndex={props.questionIndex}
      />
      <div className='mb-2 me-2 ms-2 mt-1 border-b-2 border-dotted'>
        <input
          onChange={(event) => props.onAnswerChangeText && props.onAnswerChangeText(event.target.value)}
          disabled={!Boolean(props.conductMode)}
          placeholder={SHORT_ANSWER_QUESTION_COMPONENT_TITLE_PLACEHOLDER}
          className='w-full bg-gray-100 bg-inherit py-2 pr-3'
        />
      </div>
      {Boolean(props.editMode) && <QuestionOptions questionIndex={props.questionIndex} editMode={props.editMode} />}
    </div>
  )
}
