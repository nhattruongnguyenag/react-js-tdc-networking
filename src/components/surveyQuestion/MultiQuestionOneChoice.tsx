import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ONE_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppSelector } from '../../redux/Hook'
import { useAddSurveyPostMutation } from '../../redux/Service'
import { QuestionProps } from '../../types/Question'
import { isNotBlank } from '../../utils/ValidateUtils'
import AddChoiceButton from './AddChoiceButton'
import ConductChoice from './ConductChoice'
import EditChoice from './EditChoice'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'
import ReviewChoice from './ReviewChoice'

interface MultiQuestionMultiChoiceProps extends QuestionProps {
  onChangeValue?: (choiceIds: number[]) => void
}

export default function MultiQuestionOneChoice(props: MultiQuestionMultiChoiceProps) {
  const { surveyPostRequest, questionConducts } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  const [selectedChoiceIds, setSelectedChoiceIds] = useState<number[]>([])

  useEffect(() => {
    props.onChangeValue && props.onChangeValue(selectedChoiceIds)
  }, [selectedChoiceIds])

  const renderChoices = () => {
    if (props.editMode) {
      return surveyPostRequest.questions[props.index ?? -1].choices.map((item, index) =>
        <Fragment>
          <EditChoice type={ONE_CHOICE_QUESTION} key={index.toString()} questionIndex={props.index} choiceIndex={index} />
        </Fragment>
      )
    } else if (props.reviewMode) {
      return surveyPostRequest.questions[props.index ?? -1].choices.map((item, index) =>
        <ReviewChoice type={ONE_CHOICE_QUESTION} key={index.toString()} questionIndex={props.index} choiceIndex={index} />
      )
    }

    return questionConducts[props.index ?? -1].choices.map((item, index) =>
      <ConductChoice
        onSelected={() => {
          setSelectedChoiceIds([item.voteQuestionId])
        }}
        type={ONE_CHOICE_QUESTION}
        key={index.toString()}
         questionIndex={props.index}
        choiceIndex={index} />
    )
  }

  return (
    <div className='mt-3 border pb-2'>
      <QuestionTitle
        editMode={props.editMode}
        conductMode={props.conductMode}
        reviewMode={props.reviewMode}
        index={props.index} />
      <div className='ms-2'>
        {
          renderChoices()
        }
        {
          Boolean(props.editMode) &&
          <AddChoiceButton type={ONE_CHOICE_QUESTION} questionIndex={props.index} />
        }
      </div>
      {Boolean(props.editMode) && <QuestionOptions index={props.index} />}
    </div>
  )
}
