import { Dropdown } from 'flowbite-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CREATE_RECRUITMENT_POST_PAGE, CREATE_SURVEY_POST_PAGE, USER_DETAILS_PAGE } from '../constants/Page'
import { TEXT_CREATE_NEW_POST } from '../constants/StringVietnamese'
import { MyVerticallyCenteredModal } from './modal/CustomizeNormalPostModal'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import DefaultAvatar from './common/DefaultAvatar'
import CustomizePost from './post/CustomizePost'
import { slugify } from '../utils/CommonUtls'

interface CreatePostSelectorType {
  id: number,
  group: number | null,
  groupName: string,
  avatar: string,
  name: string
}
export default function CreatePostSelector(props: Readonly<CreatePostSelectorType>) {
  const [createNormalPostModalShow, setCreateNormalPostModalShow] = useState(false)
  const navigate = useNavigate()

  const handleClickAvatarEvent = () => {
    const state = {
      userId: props.id,
      group: props.groupName,
    };
    navigate(`${USER_DETAILS_PAGE}/${slugify(props.name)}-${state.userId}`, { state });
  }
  return (
    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 pb-3 pe-4 ps-4 pt-4'>
      <div className='card-body p-0'>
        <div className='font-xssss fw-600 text-grey-500 card-body d-flex align-items-center p-0'>
          <div className='wrapperAvatarCreatePostToolBar'>
            <button onClick={() => handleClickAvatarEvent()}>
              {
                Boolean(props.avatar) ? <img
                  alt='avatar'
                  className='avatar-user-header-post shadow-sm'
                  src={SERVER_ADDRESS + 'api/images/' + props.avatar} /> : <DefaultAvatar name={props.name} size={45} styleBootstrap={undefined} />
              }
            </button>
            <Dropdown
              className='z-50 ms-4 text-black '
              label=''
              dismissOnClick={true}
              renderTrigger={() => (
                <span className='ms-1 cursor-pointer rounded-md bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-white'>
                  {TEXT_CREATE_NEW_POST}
                </span>
              )}
            >
              <Dropdown.Item onClick={() => setCreateNormalPostModalShow(true)}>Text/Hình ảnh</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(CREATE_SURVEY_POST_PAGE)}>Khảo sát</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(CREATE_RECRUITMENT_POST_PAGE)}>Tin tuyển dụng</Dropdown.Item>
            </Dropdown>
          </div>
          <MyVerticallyCenteredModal
            show={createNormalPostModalShow}
            onHide={() => setCreateNormalPostModalShow(false)}
            group={props.group}
          />
        </div>
      </div>
    </div>
  )
}
