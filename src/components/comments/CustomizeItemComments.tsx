import React from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../common/DefaultAvatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { COLOR_BLACK } from '../../constants/Color'

interface CustomizeCommentType {
    userCreatedPostId: number,
    tagName: string,
    userId: number | undefined,
    authorCommentId: number,
    type: number,
    id: number,
    name: string,
    content: string,
    avatar: string,
    timeCreated: string,
    textReply: string,
    textDelete: string,
    textCommentOfAuthor: string,
    handleClickToCommentReplyEvent: (id: number, name: string) => void,
    handleClickToDeleteCommentsEvent: (idComments: number) => void
    handleClickToAvatarAndName: (userId: number) => void
}

export default function CustomizeItemComments(props: Readonly<CustomizeCommentType>) {
    return (
        <div className={props.type === 0 ? 'containerCommentsType0   text-grey-900 text-dark' : 'containerCommentsType1  text-grey-900 text-dark'}>
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
                    <div
                        className='name'>{props.name}
                        {' '}{props.authorCommentId === props.userCreatedPostId && <span className='typeAuthorShow bg-greylight'><FontAwesomeIcon icon={faMicrophone} size='1x' color={COLOR_BLACK} />{' '}{props.textCommentOfAuthor}</span>}
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
                        className='txtBlackInfo'>{props.textReply}</button>
                    {
                        props.authorCommentId === props.userId && <button
                            onClick={() => props.handleClickToDeleteCommentsEvent(props.id)}
                            className='txtBlackInfo'>{props.textDelete}</button>
                    }
                </div>
            </div>
        </div>
    )
}