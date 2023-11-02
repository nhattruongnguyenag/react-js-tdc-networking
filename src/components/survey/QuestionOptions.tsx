import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function QuestionOptions() {
    return (
        <div className='flex items-center justify-end'>
            <button type="button" className="text-red-700 hover:bg-gray-100 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                <FontAwesomeIcon icon={icon({ name: 'trash-can' })} />
            </button>

            <label className="ms-2 relative inline-flex items-center mr-5 cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Bắt buộc</span>
            </label>
        </div>
    )
}
