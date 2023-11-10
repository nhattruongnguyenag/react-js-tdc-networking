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
    <div className='mb-2 flex items-center justify-end'>
      <button
        onClick={() => {
          dispatch(deleteQuestion(props.index ?? -1))
          dispatch(deleteQuestionTitleValidate({ index: props.index ?? -1 }))
        }}
        type='button'
        className='inline-flex items-center rounded-full p-2.5 text-center text-sm font-medium text-red-700 hover:bg-gray-100 focus:outline-none'
      >
        <FontAwesomeIcon icon={icon({ name: 'trash-can' })} />
      </button>

      <label className='relative mr-5 ms-2 inline-flex cursor-pointer items-center'>
        <input defaultChecked type='checkbox' className='peer sr-only' />
        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-purple-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-purple-800" />
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Bắt buộc</span>
      </label>
    </div>
  )
}
