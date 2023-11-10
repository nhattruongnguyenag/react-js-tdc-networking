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
                {/* Background */}
                <img className='backgroundHeaderProfile' src={SERVER_ADDRESS + 'api/images/4f1df6f082f3d8849a598ae3d9cd6c4a.jpg'} />
                {/* Avatar */}
                {
                    props.avatar !== null ? <img
                        className='avatarHeaderProfile'
                        src={SERVER_ADDRESS + 'api/images/' + props.avatar}
                    /> : <div className='avatarHeaderProfile'>
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
