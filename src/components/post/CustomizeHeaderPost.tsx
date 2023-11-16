import React, { useMemo } from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COLOR_BTN_BLUE } from '../../constants/Color'
import { CLICK_SAVE_POST_EVENT, CLICK_DELETE_POST_EVENT, CLICK_SEE_LIST_CV_POST_EVENT, CLICK_SEE_RESULT_POST_EVENT, GO_TO_MENU_ACTIONS, GO_TO_PROFILE_ACTIONS, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST, CLICK_UN_SAVE_POST_EVENT } from '../../constants/Variables'
import DefaultAvatar from '../common/DefaultAvatar'
import { TYPE_POST_STUDENT } from '../../constants/StringVietnamese'
import Dropdown from 'react-bootstrap/Dropdown';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import { useAppSelector } from '../../redux/Hook'
import PostOptionsMenu from '../menu/PostOptionsMenu'
import { MenuOptionItem } from '../../types/MenuOptionItem'

export interface HeaderPostPropsType {
  userId: number
  name: string
  avatar: string
  typeAuthor: string | null
  available: boolean | null
  timeCreatePost: string
  type: string | null
  role: string
  isSave: number
  handleClickMenuOption: (flag: number) => void
  handleClickIntoAvatarAndNameAndMenuEvent: (flag: number) => void
}

const CustomizeHeaderPost = (props: HeaderPostPropsType) => {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const menuOptions = useMemo<MenuOptionItem[]>(() => {
    let options: MenuOptionItem[] = [
      {
        type: CLICK_SAVE_POST_EVENT,
        name: 'Lưu bài viết',
        visible: props.isSave === 0
      },
      {
        type: CLICK_UN_SAVE_POST_EVENT,
        name: 'Hủy lưu bài viết',
        visible: props.isSave === 1
      }
    ]

    options = [...options, {
      type: CLICK_DELETE_POST_EVENT,
      name: 'Xóa bài viết',
      visible: userLogin?.id === props.userId
    }]

    options = [...options, {
      type: CLICK_SEE_LIST_CV_POST_EVENT,
      name: 'Xem danh sách cv',
      visible: userLogin?.id === props.userId && props.type === TYPE_RECRUITMENT_POST
    }]

    options = [...options, {
      type: CLICK_SEE_RESULT_POST_EVENT,
      name: 'Xem kết quả khảo sát',
      visible: userLogin?.id === props.userId && props.type === TYPE_SURVEY_POST
    }]

    return options
  }, [props.isSave])

  return (
    <div className='card-body d-flex w-100 m-0 p-0'>
      <div className='avatar-wrapper-header'>
        <button onClick={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_PROFILE_ACTIONS)}>
          {props.avatar ? (
            <img
              src={SERVER_ADDRESS + 'api/images/' + props.avatar}
              alt='avatar'
              className='avatar-user-header-post shadow-sm'
            />
          ) : (
            <DefaultAvatar name={props.name} size={45} styleBootstrap={undefined} />
          )}
        </button>
      </div>
      <div className='text-header-name-wrapper'>
        <h4
          onClick={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_PROFILE_ACTIONS)}
          className='cursor-pointer fw-700 text-grey-900 font-xssss mt-1'
        >
          {' '}
          {props.name}{' '}
          {
            props.role !== TYPE_POST_STUDENT && <span>
              <FontAwesomeIcon icon={faCheckCircle} size='lg' color={COLOR_BTN_BLUE} />
            </span>
          }
          {' '}
          {
            props.role !== TYPE_POST_STUDENT && <span className='typeAuthorShow bg-greylight'>{props.typeAuthor}</span>
          }
          {
            props.type !== TYPE_RECRUITMENT_POST ? <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>{props.timeCreatePost}</span> : null
          }

        </h4>
      </div>
      <PostOptionsMenu menuOptions={menuOptions} handleClickMenuOption={props.handleClickMenuOption} />
    </div>
  )
}

export default CustomizeHeaderPost
