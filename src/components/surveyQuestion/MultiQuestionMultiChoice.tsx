import { Fragment, useEffect, useState } from 'react'
import { MULTI_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppSelector } from '../../redux/Hook'
import { QuestionProps } from '../../types/Question'
import AddChoiceButton from './AddChoiceButton'
import ConductChoice from './ConductChoice'
import EditChoice from './EditChoice'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'
import ReviewChoice from './ReviewChoice'

interface MultiQuestionMultiChoiceProps extends QuestionProps {
  onChangeValue?: (choiceIds: number[]) => void
}

export default function MultiQuestionMultiChoice(props: MultiQuestionMultiChoiceProps) {
  const { surveyPostRequest, questionConducts } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  const [selectedChoiceIds, setSelectedChoiceIds] = useState<number[]>([])

  useEffect(() => {
    props.onChangeValue && props.onChangeValue(selectedChoiceIds)
  }, [selectedChoiceIds])

  const renderChoices = () => {
    if (props.editMode) {
      return surveyPostRequest.questions[props.index ?? -1].choices.map((item, index) => (
        <Fragment>
          <EditChoice
            type={MULTI_CHOICE_QUESTION}
            key={index.toString()}
            questionIndex={props.index}
            choiceIndex={index}
          />
        </Fragment>
      ))
    } else if (props.reviewMode) {
      return surveyPostRequest.questions[props.index ?? -1].choices.map((item, index) => (
        <ReviewChoice
          type={MULTI_CHOICE_QUESTION}
          key={index.toString()}
          questionIndex={props.index}
          choiceIndex={index}
        />
      ))
    }

    return questionConducts[props.index ?? -1].choices.map((item, index) => (
      <ConductChoice
        onSelected={() => {
          if (selectedChoiceIds.indexOf(item.id) != -1) {
            setSelectedChoiceIds(selectedChoiceIds.filter((value) => value != item.id))
          } else {
            setSelectedChoiceIds([...selectedChoiceIds, item.id])
          }
        }}
        type={MULTI_CHOICE_QUESTION}
        key={index.toString()}
        questionIndex={props.index}
        choiceIndex={index}
      />
    ))
  }

  return (
    <div className='mt-3 border pb-2'>
      <QuestionTitle
        editMode={props.editMode}
        conductMode={props.conductMode}
        reviewMode={props.reviewMode}
        index={props.index}
      />
      <div className='ms-2'>
        {renderChoices()}
        {Boolean(props.editMode) && <AddChoiceButton type={MULTI_CHOICE_QUESTION} questionIndex={props.index} />}
      </div>
      {Boolean(props.editMode) && <QuestionOptions index={props.index} />}
    </div>
  )
}
