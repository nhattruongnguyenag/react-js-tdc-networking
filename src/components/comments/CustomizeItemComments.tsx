import React from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { TEXT_DELETE, TEXT_REPLY } from '../../constants/StringVietnamese'
import DefaultAvatar from '../common/DefaultAvatar'

interface CustomizeCommentType {
    tagName: string,
    userId: number | undefined,
    authorCommentId: number,
    type: number,
    id: number,
    name: string,
    content: string,
    avatar: string,
    timeCreated: string,
    handleClickToCommentReplyEvent: (id: number, name: string) => void,
    handleClickToDeleteCommentsEvent: (idComments: number) => void
    handleClickToAvatarAndName: (userId: number) => void
}

export default function CustomizeItemComments(props: Readonly<CustomizeCommentType>) {
    return (
        <div className={props.type === 0 ? 'containerCommentsType0' : 'containerCommentsType1'}>
            {/* Avatar */}
            <div className='wrapperInfo'>
                <button
                    onClick={() => props.handleClickToAvatarAndName(props.authorCommentId)}
                    className='avatarCommentWrapper'>
                    {
                        Boolean(props.avatar) ? <img className={props.type === 0 ? 'avatarCommentsType0' : 'avatarCommentsType1'} src={SERVER_ADDRESS + 'api/images/' + props.avatar} /> :
                            <>{props.type === 0 ? <DefaultAvatar name={props.name[0]} size={30} styleBootstrap={undefined} /> : <DefaultAvatar name={props.name[0]} size={25} styleBootstrap={undefined} />}</>
                    }
                </button>
                <div
                    onClick={() => props.handleClickToAvatarAndName(props.authorCommentId)}
                    className='wrapperContent'>
                    {/* name */}
                    <div
                        className='name'>{props.name}
                    </div>
                </div>
            </div>
            <div className='contentWrapper'>
                {/* content */}
                <span className='contentComments'>{props.tagName && <span className='tagName'>@{props.tagName}{' '}</span>}{props.content}</span>
                <div className='wrapperBottomComment'>
                    <button className='txtBlackInfo'>{props.timeCreated}</button>
                    <button
                        onClick={() => props.handleClickToCommentReplyEvent(props.id, props.name)}
                        className='txtBlackInfo'>{TEXT_REPLY}</button>
                    {
                        props.authorCommentId === props.userId && <button
                            onClick={() => props.handleClickToDeleteCommentsEvent(props.id)}
                            className='txtBlackInfo'>{TEXT_DELETE}</button>
                    }
                </div>
            </div>
        </div>
    )
}
