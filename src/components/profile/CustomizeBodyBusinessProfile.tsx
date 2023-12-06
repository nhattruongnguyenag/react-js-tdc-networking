import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faUserPlus, faBars, faPaste, faClock, faMoneyCheck, faSquarePen, faUserTie, faMapLocationDot, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { COLOR_BLACK, COLOR_WHITE } from '../../constants/Color'
import { CALL_ACTION, CHANGE_INFO_USER_CLICK_ACTION, FOLLOW_ACTION, MENU_CLICK_ACTION, MESSENGER_ACTION } from '../../constants/Variables';
import { TEXT_EMAIL, TEXT_PHONE, TEXT_PLACEHOLDER_ADDRESS, TEXT_PLACEHOLDER_TAXCODE, TEXT_POST, TEXT_REPRESENTER, TEXT_TIME_WORK } from '../../constants/StringVietnamese';
import { useTranslation } from 'react-multi-lang';

interface BusinessProfileType {
    t: ReturnType<typeof useTranslation>,
    timeWork: string,
    TaxIdentificationNumber: string,
    representative: string,
    address: string,
    phone: string,
    email: string,
    name: string,
    numberPost: number,
    isFollow: boolean,
    isSameUser: boolean,
    handleClickButtonEvent: (flag: number) => void
}

function CustomizeBodyBusinessProfile(props: Readonly<BusinessProfileType>) {
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
                        {props.t("Profile.chat")}
                    </button>
                        <button
                            onClick={() => props.handleClickButtonEvent(CALL_ACTION)}
                            className='btn-react-header-profile'>
                            <FontAwesomeIcon icon={faPhone}
                                size='xl'
                                color={COLOR_WHITE}
                                className='button-header-profile-react' />
                            {props.t("Profile.call")}
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
                                    {props.t("Profile.unFollow")}
                                </> : <><FontAwesomeIcon icon={faUserPlus}
                                    size='xl'
                                    color={COLOR_WHITE}
                                    className='button-header-profile-react' />
                                    {props.t("Profile.follow")}</>
                            }
                        </button></> : <button
                            onClick={() => props.handleClickButtonEvent(CHANGE_INFO_USER_CLICK_ACTION)}
                            className='btn-react-header-profile bg-grey text-dark'>
                        <FontAwesomeIcon icon={faSquarePen}
                            size='xl'
                            color={COLOR_BLACK}
                            className='button-header-profile-react' />
                        {props.t("Profile.updateProfile")}
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
                    <FontAwesomeIcon icon={faClock} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.profileOperatingHours")}: {props.timeWork}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faMoneyCheck} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.profileTaxID")}: {props.TaxIdentificationNumber}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faUserTie} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.profileRepresentative")}: {props.representative}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faMapLocationDot} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.profileAddress")}: {props.address}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faPhone} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.profilePhone")}: {props.phone}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.profileEmail")}: {props.email}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faPaste} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{props.t("Profile.profileArticles")} ( {props.numberPost} ) </div>
            </div>
        </div>
    )
}

export default CustomizeBodyBusinessProfile