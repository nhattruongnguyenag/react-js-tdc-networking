import React, { useState } from 'react'
import { Comment } from '../../types/Comment'
import CustomizeItemComments from './CustomizeItemComments';
import { useAppSelector } from '../../redux/Hook';
import { numberDayPassed } from '../../utils/FormatTime';
import { COLOR_GREY } from '../../constants/Color';
import { TEXT_HIDDEN_COMMENTS, TEXT_SEE_MORE_COMMENTS } from '../../constants/StringVietnamese';

interface CommentPostType {
    comments: Comment[]
    handleClickToCommentReplyEvent: (id: number, name: string) => void,
    handleClickToDeleteCommentsEvent: (idComment: number) => void,
    handleClickToAvatarAndName: (userId: number) => void,
}
export default function CustomizeCommentPost(props: Readonly<CommentPostType>) {
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    return (
        <div className='containerComments'>
            {props.comments && props.comments.map((_item) => (
                _item.parent === null ? <ExportComments
                    key={_item.id.toString()}
                    commentItem={_item}
                    userLoginId={userLogin?.id}
                    handleClickToCommentReplyEvent={props.handleClickToCommentReplyEvent}
                    handleClickToDeleteCommentsEvent={props.handleClickToDeleteCommentsEvent}
                    handleClickToAvatarAndName={props.handleClickToAvatarAndName}
                /> : null
            ))}
        </div>
    )
}

export interface CommentChildrenType {
    commentItem: Comment,
    userLoginId: number | undefined,
    handleClickToCommentReplyEvent: (id: number, name: string) => void,
    handleClickToDeleteCommentsEvent: (idComment: number) => void,
    handleClickToAvatarAndName: (userId: number) => void,
}
export function ExportComments(item: Readonly<CommentChildrenType>) {

    const hasChildren = item.commentItem.childrens && item.commentItem.childrens.length > 0;
    const [seeMore, setSeeMore] = useState(false);
    const handleSeeMoreClick = () => {
        setSeeMore(!seeMore);
    }
    return (
        <>
            <CustomizeItemComments
                tagName={item.commentItem.parent?.name ?? ''}
                userId={item.userLoginId}
                authorCommentId={item.commentItem.user['id']}
                type={item.commentItem.parent === null ? 0 : 1}
                key={item.commentItem.id}
                id={item.commentItem.id}
                name={item.commentItem.user.name}
                content={item.commentItem.content}
                avatar={item.commentItem.user.image}
                timeCreated={numberDayPassed(item.commentItem.createdAt)}
                handleClickToCommentReplyEvent={item.handleClickToCommentReplyEvent}
                handleClickToDeleteCommentsEvent={item.handleClickToDeleteCommentsEvent}
                handleClickToAvatarAndName={item.handleClickToAvatarAndName}
            />
            {
                hasChildren && (<>
                    <button
                        onClick={() => { setSeeMore(!seeMore) }}
                    >
                        <div style={{ color: COLOR_GREY, fontSize: 12 }}>{seeMore ? TEXT_HIDDEN_COMMENTS : TEXT_SEE_MORE_COMMENTS}</div>
                    </button>
                    {
                        seeMore && (
                            item.commentItem.childrens.map((childItem, index) => (
                                <ExportComments
                                    key={index.toString()}
                                    commentItem={childItem}
                                    handleClickToCommentReplyEvent={item.handleClickToCommentReplyEvent}
                                    handleClickToDeleteCommentsEvent={item.handleClickToDeleteCommentsEvent}
                                    userLoginId={item.userLoginId}
                                    handleClickToAvatarAndName={item.handleClickToAvatarAndName}
                                />
                            ))
                        )
                    }
                </>
                )
            }
        </>
    )
}
