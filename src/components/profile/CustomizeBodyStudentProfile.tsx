import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faPhone, faEnvelope, faUserPlus, faBars, faPaste } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { COLOR_BLACK, COLOR_WHITE } from '../../constants/Color'
import { CALL_ACTION, FOLLOW_ACTION, MENU_CLICK_ACTION, MESSENGER_ACTION } from '../../constants/Variables';
export interface StudentProfileType {
    handleClickButtonEvent: (flag: number) => void,
    position: string,
    phone: string,
    email: string,
    numberPost: number,
    name: string
}

export default function CustomizeBodyStudentProfile(props: Readonly<StudentProfileType>) {
    return (
        <div className='containerBodyProfile'>
            <div className='lineOfInfoBodyProfile'>
                <button
                    onClick={() => props.handleClickButtonEvent(MESSENGER_ACTION)}
                    className='btn-react-header-profile'>
                    <FontAwesomeIcon
                        icon={faFacebookMessenger}
                        size='xl'
                        color={COLOR_WHITE}
                        className='button-header-profile-react' />
                    Nhắn tin
                </button>
                <button
                    onClick={() => props.handleClickButtonEvent(CALL_ACTION)}
                    className='btn-react-header-profile'>
                    <FontAwesomeIcon icon={faPhone}
                        size='xl'
                        color={COLOR_WHITE}
                        className='button-header-profile-react' />
                    Gọi điện
                </button>
                <button
                    onClick={() => props.handleClickButtonEvent(FOLLOW_ACTION)}
                    className='btn-react-header-profile'>
                    <FontAwesomeIcon icon={faUserPlus}
                        size='xl'
                        color={COLOR_WHITE}
                        className='button-header-profile-react' />
                    Theo dõi
                </button>
                <button
                    onClick={() => props.handleClickButtonEvent(MENU_CLICK_ACTION)}
                    className='btn-react-header-profile-menu'>
                    <FontAwesomeIcon icon={faBars}
                        size='xl'
                        color={COLOR_WHITE}
                        className='button-header-profile-react-menu' />
                </button>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faBriefcase} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.position}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faPhone} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.phone}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.email}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faPaste} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>Bài viết ({props.numberPost}) </div>
            </div>
        </div>
    )
}
