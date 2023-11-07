import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ONE_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppSelector } from '../../redux/Hook'
import { useAddSurveyPostMutation } from '../../redux/Service'
import { QuestionProps } from '../../types/Question'
import { isNotBlank } from '../../utils/ValidateUtils'
import AddChoiceButton from './AddChoiceButton'
import EditChoice from './EditChoice'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'
import ReviewChoice from './ReviewChoice'

export default function MultiQuestionOneChoice(props: QuestionProps) {
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  return (
    <div className='mt-3 border pb-2'>
      <QuestionTitle reviewMode={props.reviewMode} index={props.index} />
      <div className='ms-2'>
        {surveyPostRequest.questions[props.index ?? -1].choices.map((item, index) =>
          Boolean(props.reviewMode) ? (
            isNotBlank(item) && (
              <ReviewChoice type={ONE_CHOICE_QUESTION} key={index} questionIndex={props.index} choiceIndex={index} />
            )
          ) : (
            <EditChoice type={ONE_CHOICE_QUESTION} key={index} questionIndex={props.index} choiceIndex={index} />
          )
        )}

        {Boolean(props.reviewMode) || <AddChoiceButton type={ONE_CHOICE_QUESTION} questionIndex={props.index} />}
      </div>
      {Boolean(props.reviewMode) || <QuestionOptions />}
    </div>
  )
}
