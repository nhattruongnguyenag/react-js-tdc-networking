import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '../../redux/Hook'
import { deleteQuestion, deleteQuestionTitleValidate } from '../../redux/Slice'

interface QuestionOptionsProps {
    index?: number
}

export default function QuestionOptions(props: QuestionOptionsProps) {
    const dispatch = useAppDispatch()
    return (
        <div className='flex items-center justify-end mb-2'>
            <button
                onClick={() => {
                    dispatch(deleteQuestion(props.index ?? -1))
                    dispatch(deleteQuestionTitleValidate({index: props.index ?? -1}))
                }}
                type="button" className="text-red-700 hover:bg-gray-100 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                <FontAwesomeIcon icon={icon({ name: 'trash-can' })} />
            </button>

            <label className="ms-2 relative inline-flex items-center mr-5 cursor-pointer">
                <input defaultChecked type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Bắt buộc</span>
            </label>
        </div>
    )
}
