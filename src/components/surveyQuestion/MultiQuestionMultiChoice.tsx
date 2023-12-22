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
let md5 = require('md5')

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
      return surveyPostRequest.questions[props.questionIndex ?? -1].choices.map((item, index) => (
        <Fragment key={md5(index + Date.now())}>
          <EditChoice type={MULTI_CHOICE_QUESTION} questionIndex={props.questionIndex} choiceIndex={index} />
        </Fragment>
      ))
    } else if (props.reviewMode) {
      return surveyPostRequest.questions[props.questionIndex ?? -1].choices.map((item, index) => (
        <ReviewChoice
          type={MULTI_CHOICE_QUESTION}
          key={md5(index + Date.now())}
          questionIndex={props.questionIndex}
          choiceIndex={index}
        />
      ))
    }

    return surveyPostRequest.questions[props.questionIndex ?? -1].choices.map((item, index) => (
      <ConductChoice
        onSelected={() => {
          if (selectedChoiceIds.indexOf(item.id ?? -1) != -1) {
            setSelectedChoiceIds(selectedChoiceIds.filter((value) => value != item.id))
          } else {
            setSelectedChoiceIds([...selectedChoiceIds, item.id ?? -1])
          }
        }}
        type={MULTI_CHOICE_QUESTION}
        key={index.toString()}
        questionIndex={props.questionIndex}
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
        questionIndex={props.questionIndex}
      />
      <div className='ms-2'>
        {renderChoices()}
        {Boolean(props.editMode) && (
          <AddChoiceButton type={MULTI_CHOICE_QUESTION} questionIndex={props.questionIndex} />
        )}
      </div>
      {Boolean(props.editMode) && <QuestionOptions questionIndex={props.questionIndex} editMode={props.editMode}/>}
    </div>
  )
}
