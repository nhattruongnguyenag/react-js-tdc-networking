import React, { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../common/DefaultAvatar'
import { AVATAR_CLICK, AVATAR_CLICK_UPLOAD, BACKGROUND_CLICK, BACKGROUND_CLICK_UPLOAD, bigLoading, smallLoading } from '../../constants/Variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { COLOR_BLACK } from '../../constants/Color'
import { IMAGE_URL } from '../../constants/Path'
interface HeaderProfileType {
    isSameUser: boolean
    background: string
    avatar: string | null
    name: string
    handleClickButtonEvent: (flag: number) => void
    handleClickIntoHeaderComponentEvent: (flag: number) => void
}

export default function CustomizeHeaderProfile(props: Readonly<HeaderProfileType>) {
    const URL_IMAGE_BACKGROUND_DEFAULT = '/assets/images/background-default.jpg';
    const [isImageBackgroundLoaded, setImageBackgroundLoaded] = useState<boolean>(false);
    const [isImageAvatarLoaded, setImageAvatarLoaded] = useState<boolean>(false);

    useEffect(() => {
        !Boolean(props.background) && setImageBackgroundLoaded(true);
        !Boolean(props.avatar) && setImageAvatarLoaded(true);
    }, [props.background, props.avatar])

    return (
        <>
            <div className='containerImagesProfileHeader'>
                {/* Background Image */}
                <div
                    onClick={() => { props.handleClickButtonEvent(BACKGROUND_CLICK) }}
                >
                    {!isImageBackgroundLoaded && (
                        <div
                            className='wrapperLoadingOfModalImage'
                        >
                            {bigLoading}
                        </div>
                    )}

                    {props.background ? (
                        <img className='backgroundHeaderProfile'
                            onLoad={() => setImageBackgroundLoaded(true)}
                            style={{
                                opacity: isImageBackgroundLoaded ? 1 : 0,
                            }}
                            src={IMAGE_URL + props.background} />
                    ) : (
                        <img className='backgroundHeaderProfile' src={URL_IMAGE_BACKGROUND_DEFAULT} />
                    )}
                </div>

                {/* Avatar Image */}
                <div
                    className='wrapperAvatarImage'
                    onClick={() => { props.handleClickButtonEvent(AVATAR_CLICK) }}
                >
                    {!isImageAvatarLoaded && (
                        <div
                            className='wrapperLoadingOfModalImage'
                        >
                            {smallLoading}
                        </div>
                    )}
                    {props.avatar ? (
                        <img
                            className='avatarHeaderProfile'
                            src={IMAGE_URL + props.avatar}
                            onLoad={() => setImageAvatarLoaded(true)}
                            style={{
                                opacity: isImageAvatarLoaded ? 1 : 0,
                            }}
                        />
                    ) : (
                        <div className='avatarHeaderProfileDefault'>
                            <DefaultAvatar name={props.name[0]} size={150} styleBootstrap={undefined} />
                        </div>
                    )}
                    {
                        props.isSameUser && <button
                            className='buttonWrapperIconCamera buttonWrapperIconCameraAvatar'
                            onClick={(e) => {
                                e.stopPropagation();
                                props.handleClickButtonEvent(AVATAR_CLICK_UPLOAD);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCameraRetro}
                                size={'1x'}
                                color={COLOR_BLACK}
                            />
                        </button>
                    }
                </div>
                {
                    props.isSameUser && <button
                        className='buttonWrapperIconCamera buttonWrapperIconCameraBackground'
                        onClick={(e) => {
                            e.stopPropagation();
                            props.handleClickButtonEvent(BACKGROUND_CLICK_UPLOAD);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faCameraRetro}
                            size={'1x'}
                            color={COLOR_BLACK}
                        />
                    </button>
                }
            </div>
            {/* Name */}
            <div className='containerUserProfileInfo text-grey-900 text-dark'>
                <div className='txtNameProfile'>{props.name}</div>
            </div>
        </>
    )
}