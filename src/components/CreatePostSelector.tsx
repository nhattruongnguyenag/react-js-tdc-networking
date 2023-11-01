import { Dropdown } from 'flowbite-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CREATE_RECRUITMENT_POST_PAGE, CREATE_SURVEY_POST_PAGE } from '../constants/Page'
import { TEXT_CREATE_NEW_POST } from '../constants/StringVietnamese'
import CreateNormalPostModal, { MyVerticallyCenteredModal } from './modal/CreateNormalPostModal'

export default function CreatePostSelector() {
    const [createNormalPostModalShow, setCreateNormalPostModalShow] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 pb-3 pe-4 ps-4 pt-4'>
            <div className='card-body p-0'>
                <div className='font-xssss fw-600 text-grey-500 card-body d-flex align-items-center p-0'>
                    <i className='btn-round-sm font-xs text-primary feather-edit-3 bg-greylight me-2' />
                    <Dropdown
                        className='ms-4 z-50 text-black '
                        label=""
                        dismissOnClick={true}
                        renderTrigger={() =>
                            <span className='ms-1 cursor-pointer bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-4 py-2 rounded-md'>
                                {TEXT_CREATE_NEW_POST}
                            </span>}>
                        <Dropdown.Item
                            onClick={() => setCreateNormalPostModalShow(true)}>
                            Text/Hình ảnh
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => navigate(CREATE_SURVEY_POST_PAGE)}>
                            Khảo sát</Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => navigate(CREATE_RECRUITMENT_POST_PAGE)}>
                            Tin tuyển dụng</Dropdown.Item>
                    </Dropdown>
                    <MyVerticallyCenteredModal show={createNormalPostModalShow} onHide={() => setCreateNormalPostModalShow(false)} />
                </div>
            </div>
        </div>
    )
}
