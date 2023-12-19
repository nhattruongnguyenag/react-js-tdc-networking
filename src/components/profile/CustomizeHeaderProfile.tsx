import React from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../common/DefaultAvatar'
import { AVATAR_CLICK, BACKGROUND_CLICK } from '../../constants/Variables'
interface HeaderProfileType {
    background: string
    avatar: string | null
    name: string
    handleClickButtonEvent: (flag: number) => void
    handleClickIntoHeaderComponentEvent: (flag: number) => void
}

export default function CustomizeHeaderProfile(props: Readonly<HeaderProfileType>) {
    return (
        <>
            <div className='containerImagesProfileHeader'>
                {/* Background Image */}
                <div
                    onClick={() => { props.handleClickButtonEvent(BACKGROUND_CLICK) }}
                >
                    {props.background ? (
                        <img className='backgroundHeaderProfile' src={SERVER_ADDRESS + 'api/images/' + props.background} />
                    ) : (
                        <img className='backgroundHeaderProfile' src={'/assets/images/background-default.jpg'} />
                    )}
                </div>

                {/* Avatar Image */}
                <div
                    onClick={() => { props.handleClickButtonEvent(AVATAR_CLICK) }}
                >
                    {props.avatar ? (
                        <img
                            className='avatarHeaderProfile'
                            src={SERVER_ADDRESS + 'api/images/' + props.avatar}
                        />
                    ) : (
                        <div className='avatarHeaderProfileDefault'>
                            <DefaultAvatar name={props.name[0]} size={150} styleBootstrap={undefined} />
                        </div>
                    )}
                </div>
            </div>
            {/* Name */}
            <div className='containerUserProfileInfo'>
                <div className='txtNameProfile'>{props.name}</div>
            </div>
        </>
    )
}
