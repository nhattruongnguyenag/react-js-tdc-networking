import { Dropdown } from 'flowbite-react'
import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CREATE_RECRUITMENT_POST_PAGE, CREATE_SURVEY_POST_PAGE, USER_DETAILS_PAGE } from '../constants/Page'
import { CreatePostModal } from './modal/CustomizeNormalPostModal'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import DefaultAvatar from './common/DefaultAvatar'
import { slugify } from '../utils/CommonUtls'
import '../assets/css/createPost.css'
import vi from '../translate/vn.json'
import en from '../translate/en.json'
import jp from '../translate/jp.json'
import { setTranslations, useTranslation } from 'react-multi-lang'
setTranslations({ vi, en, jp })
interface CreatePostSelectorType {
  id: number,
  group: number | null,
  groupName: string,
  avatar: string,
  name: string
}
const CreatePostSelector = (props: Readonly<CreatePostSelectorType>) => {
  const [createNormalPostModalShow, setCreateNormalPostModalShow] = useState(false)
  const navigate = useNavigate()
  const t = useTranslation();

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
                  {t("CreatePostToolbar.createPostToolbarTitle")}
                </span>
              )}
            >
              <Dropdown.Item onClick={() => setCreateNormalPostModalShow(true)}>{t("CreatePostToolbar.createPostToolbarNormalPost")}</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(CREATE_SURVEY_POST_PAGE)}>{t("CreatePostToolbar.createPostToolbarSurveyPost")}</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(CREATE_RECRUITMENT_POST_PAGE)}>{t("CreatePostToolbar.createPostToolbarRecruitmentPost")}</Dropdown.Item>
            </Dropdown>
          </div>
          <CreatePostModal
            show={createNormalPostModalShow}
            onHide={() => setCreateNormalPostModalShow(false)}
            group={props.group}
            t={t}
            updateNormalPost={null}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(CreatePostSelector)