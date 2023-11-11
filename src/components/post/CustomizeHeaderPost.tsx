import React from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COLOR_BTN_BLUE } from '../../constants/Color'
import { GO_TO_MENU_ACTIONS, GO_TO_PROFILE_ACTIONS, TYPE_RECRUITMENT_POST } from '../../constants/Variables'
import DefaultAvatar from '../common/DefaultAvatar'
import { TYPE_POST_STUDENT } from '../../constants/StringVietnamese'

export interface HeaderPostPropsType {
  name: string
  avatar: string
  typeAuthor: string | null
  available: boolean | null
  timeCreatePost: string
  type: string | null
  role: string
  handleClickIntoAvatarAndNameAndMenuEvent: (flag: number) => void
}

const CustomizeHeaderPost = (props: HeaderPostPropsType) => {
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
      <div className='button-menu-header-wrapper'>
        <button
          className='button-menu'
          onClick={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_MENU_ACTIONS)}
        >
          <i className='ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss' />
        </button>
      </div>
    </div>
  )
}

export default CustomizeHeaderPost
