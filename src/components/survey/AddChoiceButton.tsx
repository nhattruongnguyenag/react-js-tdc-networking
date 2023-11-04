import { ONE_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppDispatch } from '../../redux/Hook'
import { addChoice } from '../../redux/Slice'

interface AddChoiceButtonProps {
    questionIndex?: number
    type?: string
}

export default function AddChoiceButton(props: AddChoiceButtonProps) {
    const dispatch = useAppDispatch()
    return (
        <div className="flex items-center mt-3">
            {
                props.type && props.type === ONE_CHOICE_QUESTION ?
                    <input id="default-radio-1" disabled checked={false} type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    :
                    <input id="default-checkbox" disabled type="checkbox" className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            }
            <label
                onClick={() => {
                    dispatch(addChoice({ questionIndex: props.questionIndex ?? -1 }))
                }}
                htmlFor="default-radio-1" className="cursor-pointer ml-2 text-sm font-se font-medium text-blue-500 dark:text-gray-300 hover:text-blue-400">Thêm lựa chọn</label>
        </div>
    )
}