import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function EditCheckboxChoice() {
    return (
        <div className="flex items-center mt-3">
            <input id="default-checkbox" disabled checked={false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <input placeholder='Câu trả lời' className='ms-2 w-full border-dotted focus:border-b-2 border-indigo-600 bg-gray-100 bg-inherit py-1 mt-1' />
            <button type="button" className="text-gray-700 hover:bg-gray-100 focus:outline-none rounded-full p-2 mx-3 text-center inline-flex items-center">
                <FontAwesomeIcon style={{ fontSize: 20 }} icon={icon({ name: 'close' })} />
            </button>
        </div>
    )
}
