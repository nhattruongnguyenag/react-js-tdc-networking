import classNames from 'classnames'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PENDING_POST_PAGE, REJECT_POST_PAGE } from '../../constants/Page'

export default function PostManagementTab() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
            <li className="me-2">
                <button
                    onClick={() => navigate(PENDING_POST_PAGE)}
                    id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" className={classNames("inline-block p-4  rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700", location.pathname === PENDING_POST_PAGE ? 'text-blue-600 dark:text-blue-500' : '')}>Đang chờ</button>
            </li>
            <li className="me-2">
                <button
                    onClick={() => navigate(REJECT_POST_PAGE)}
                    id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" className={classNames("inline-block p-4  rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700", location.pathname === REJECT_POST_PAGE ? 'text-blue-600 dark:text-blue-500' : '')} > Bị từ chối</button>
            </li>
        </ul >
    )
}
