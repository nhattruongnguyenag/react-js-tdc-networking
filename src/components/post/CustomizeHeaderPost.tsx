import React from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLOR_BTN_BLUE } from '../../constants/Color';
import { GO_TO_MENU_ACTIONS, GO_TO_PROFILE_ACTIONS } from '../../constants/Variables';

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
        <>
            <div className='card-body d-flex p-0'>
                <figure className='avatar me-3'>
                    <button
                        onClick={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_PROFILE_ACTIONS)}
                    >
                        <img
                            src={SERVER_ADDRESS + 'api/images/' + props.avatar}
                            alt='avatar'
                            className='avatar-user-header-post shadow-sm' />
                    </button>
                </figure>
                <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
                    {' '}{props.name} <span><FontAwesomeIcon icon={faCheckCircle} size="lg" color={COLOR_BTN_BLUE} /></span>{' '}
                    <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>{props.timeCreatePost}</span>
                </h4>
                <div className='pointer ms-auto'>
                    <button
                        onClick={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_MENU_ACTIONS)}
                    >
                        <i className='ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default CustomizeHeaderPost