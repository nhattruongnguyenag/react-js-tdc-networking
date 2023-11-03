import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ONE_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { deleteChoice, updateChoice } from '../../redux/Slice'

export interface ChoiceProps {
  choiceIndex?: number
  questionIndex?: number
  type?: string
}

export default function EditChoice(props: ChoiceProps) {
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const choiceIndex = props.choiceIndex ?? -1
  const questionIndex = props.questionIndex ?? -1

  const onDeleteChoice = () => {
    dispatch(deleteChoice({ questionIndex: questionIndex, choiceIndex: choiceIndex }))
  }

  return (
    <div className="flex items-center mt-3">
      {
        props.type && props.type === ONE_CHOICE_QUESTION ?
          <input disabled checked={false} type="radio" name="default-radio" className="w-5 h-5 text-blue-600 bg-gray-100 dark:bg-gray-700 dark:border-gray-600" />
          :
          <input id="default-checkbox" disabled checked={false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      }
      <input placeholder={'Lựa chọn ' + (choiceIndex + 1)}
        onChange={(event) => {
          dispatch(updateChoice({
            questionIndex: questionIndex,
            choiceIndex: choiceIndex,
            choice: event.target.value
          }))
        }}
        value={surveyPostRequest.questions[questionIndex].choices[choiceIndex]}
        className='text-ellipsis ms-2 w-full border-dotted hover:border-b-2 focus:border-b-2 border-indigo-600 bg-gray-100 bg-inherit py-1 mt-1' />
      <button
        onClick={onDeleteChoice}
        type="button" className="text-gray-700 hover:bg-gray-100 focus:outline-none rounded-full p-2 mx-3 text-center inline-flex items-center">
        <FontAwesomeIcon style={{ fontSize: 20 }} icon={icon({ name: 'close' })} />
      </button>
    </div>
  )
}
