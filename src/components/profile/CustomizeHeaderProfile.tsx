import React from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../common/DefaultAvatar'

interface HeaderProfileType {
    background: string,
    avatar: string | null,
    name: string,
    handleClickIntoHeaderComponentEvent: (flag: number) => void
}

export default function CustomizeHeaderProfile(props: Readonly<HeaderProfileType>) {
    return (
        <div className='containerHeaderProfile'>
            {/* Images */}
            <div className='containerImagesProfileHeader'>
                {
                    props.background ? <img className='backgroundHeaderProfile' src={SERVER_ADDRESS + 'api/images/' + props.background}
                    /> : <img className='backgroundHeaderProfile' src={'/assets/images/background-default.jpg'} />
                }
                {
                    props.avatar ? <img
                        className='avatarHeaderProfile'
                        src={SERVER_ADDRESS + 'api/images/' + props.avatar}
                    /> : <div className='avatarHeaderProfileDefault'>
                        <DefaultAvatar name={props.name[0]} size={150} styleBootstrap={undefined} />
                    </div>
                }
            </div>
            {/* Name */}
            <div className='containerUserProfileInfo'>
                <div className='txtNameProfile'>{props.name}</div>
            </div>
        </div>
    )
}
