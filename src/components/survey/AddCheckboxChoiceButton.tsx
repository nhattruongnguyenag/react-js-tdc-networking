import React from 'react'

export default function AddCheckboxChoiceButton() {
    return (
        <div className="flex items-center mt-3">
           <input id="default-checkbox" disabled type="checkbox" className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-checkbox" className="cursor-pointer ml-2 text-sm font-se font-medium text-blue-500 dark:text-gray-300 hover:text-blue-400" >Thêm lựa chọn</label>
        </div>
    )
}
