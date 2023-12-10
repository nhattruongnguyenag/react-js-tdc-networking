import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faUserPlus, faBars, faPaste, faClock, faMoneyCheck, faUserTie, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { COLOR_BLACK, COLOR_WHITE } from '../../constants/Color'
import { CALL_ACTION, FOLLOW_ACTION, MENU_CLICK_ACTION, MESSENGER_ACTION } from '../../constants/Variables';
import { TEXT_EMAIL, TEXT_PHONE, TEXT_PLACEHOLDER_ADDRESS, TEXT_PLACEHOLDER_TAXCODE, TEXT_POST, TEXT_REPRESENTER, TEXT_TIME_WORK } from '../../constants/StringVietnamese';

interface BusinessProfileType {
    handleClickButtonEvent: (flag: number) => void,
    timeWork: string,
    TaxIdentificationNumber: string,
    representative: string,
    address: string,
    phone: string,
    email: string,
    name: string,
    numberPost: number
}

function CustomizeBodyBusinessProfile(props: Readonly<BusinessProfileType>) {
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
            {/*  */}
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faClock} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{TEXT_TIME_WORK}: {props.timeWork}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faMoneyCheck} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{TEXT_PLACEHOLDER_TAXCODE}: {props.TaxIdentificationNumber}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faUserTie} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{TEXT_REPRESENTER}: {props.representative}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faMapLocationDot} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{TEXT_PLACEHOLDER_ADDRESS}: {props.address}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faPhone} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{TEXT_PHONE}: {props.phone}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{TEXT_EMAIL}: {props.email}</div>
            </div>
            <div className='lineOfInfoBodyProfile'>
                <div>
                    <FontAwesomeIcon icon={faPaste} size='xl' color={COLOR_BLACK} className='icon-arrow-left' />
                </div>
                <div className='txtInfoBodyProfile'>{TEXT_POST} ( {props.numberPost} ) </div>
            </div>
        </div>
    )
}

export default CustomizeBodyBusinessProfile