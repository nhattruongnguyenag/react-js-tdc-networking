import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faPhone, faEnvelope, faUserPlus, faBars, faPaste, faUserMinus , faSquarePen} from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { COLOR_BLACK, COLOR_WHITE } from '../../constants/Color'
import { CALL_ACTION, CHANGE_INFO_USER_CLICK_ACTION, FOLLOW_ACTION, MENU_CLICK_ACTION, MESSENGER_ACTION } from '../../constants/Variables';
import { TEXT_EMAIL, TEXT_PHONE, TEXT_POSITION, TEXT_POST } from '../../constants/StringVietnamese';
import { useTranslation } from 'react-multi-lang';
export interface StudentProfileType {
    t:ReturnType<typeof useTranslation>,
    handleClickButtonEvent: (flag: number) => void,
    position: string,
    phone: string,
    email: string,
    numberPost: number,
    name: string,
    isFollow: boolean,
    isSameUser: boolean
}

export default function CustomizeBodyStudentProfile(props: Readonly<StudentProfileType>) {
    return (
        <div className='containerBodyProfile'>
            <div className='lineOfInfoBodyProfile'>
                {
                    !props.isSameUser ? <> <button
                        onClick={() => props.handleClickButtonEvent(MESSENGER_ACTION)}
                        className='btn-react-header-profile'>
                        <FontAwesomeIcon
                            icon={faFacebookMessenger}
                            size='xl'
                            color={COLOR_WHITE}
                            className='button-header-profile-react' />
                        {props.t("Profile.Chat")}
                    </button>
                        <button
                            onClick={() => props.handleClickButtonEvent(CALL_ACTION)}
                            className='btn-react-header-profile'>
                            <FontAwesomeIcon icon={faPhone}
                                size='xl'
                                color={COLOR_WHITE}
                                className='button-header-profile-react' />
                            {props.t("Profile.Call")}
                        </button>
                        <button
                            onClick={() => props.handleClickButtonEvent(FOLLOW_ACTION)}
                            className='btn-react-header-profile'>
                            {
                                props.isFollow ? <>
                                    <FontAwesomeIcon icon={faUserMinus}
                                        size='xl'
                                        color={COLOR_WHITE}
                                        className='button-header-profile-react' />
                                   {props.t("Profile.UnFollow")}
                                </> : <><FontAwesomeIcon icon={faUserPlus}
                                    size='xl'
                                    color={COLOR_WHITE}
                                    className='button-header-profile-react' />
                                     {props.t("Profile.Follow")}</>
                            }
                        </button></> : <button
                            onClick={() => props.handleClickButtonEvent(CHANGE_INFO_USER_CLICK_ACTION)}
                            className='btn-react-header-profile bg-grey text-dark'>
                        <FontAwesomeIcon icon={faSquarePen}
                            size='xl'
                            color={COLOR_BLACK}
                            className='button-header-profile-react' />
                            {props.t("Profile.UpdateProfile")}
                    </button>
                }
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
                <div className='txtInfoBodyProfile'>{props.t("Profile.ProfilePosition") + ': ' + props.position}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faPhone} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.ProfilePhone") + ': ' + props.phone}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.ProfileEmail") + ": " + props.email}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faPaste} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'> {props.t("Profile.ProfileArticles")  + ': (  ' + props.numberPost + ' )'} </div>
            </div>
        </div>
    )
}
