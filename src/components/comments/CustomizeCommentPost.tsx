import React, { useState } from 'react'
import { Comment } from '../../types/Comment'
import CustomizeItemComments from './CustomizeItemComments';
import { useAppSelector } from '../../redux/Hook';
import { numberDayPassed } from '../../utils/FormatTime';
import { COLOR_GREY } from '../../constants/Color';
import { useTranslation } from 'react-multi-lang';
import { getFacultyTranslated } from '../../utils/TranslateFaculty';
interface CommentPostType {
    userCreatedPostId: number,
    t: ReturnType<typeof useTranslation>,
    textReplyComment: string,
    textDeleteComment: string,
    comments: Comment[],
    textSeeMore: string,
    textHidden: string,
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
                    textReplyComment={props.textReplyComment}
                    textDeleteComment={props.textDeleteComment}
                    textSeeMore={props.textSeeMore}
                    textHidden={props.textHidden}
                    t={props.t}
                    userCreatedPostId={props.userCreatedPostId}
                /> : null
            ))}
        </div>
    )
}

export interface CommentChildrenType {
    userCreatedPostId: number,
    t: ReturnType<typeof useTranslation>,
    textSeeMore: string,
    textHidden: string,
    textReplyComment: string,
    textDeleteComment: string,
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
                userCreatedPostId={item.userCreatedPostId}
                tagName={item.commentItem.parent?.name ? getFacultyTranslated(item.commentItem.parent?.name, item.t) : ''}
                userId={item.userLoginId}
                authorCommentId={item.commentItem.user['id']}
                type={item.commentItem.parent === null ? 0 : 1}
                key={item.commentItem.id}
                id={item.commentItem.id}
                name={getFacultyTranslated(item.commentItem.user.name, item.t)}
                content={item.commentItem.content}
                avatar={item.commentItem.user.image}
                timeCreated={numberDayPassed(item.commentItem.createdAt)}
                handleClickToCommentReplyEvent={item.handleClickToCommentReplyEvent}
                handleClickToDeleteCommentsEvent={item.handleClickToDeleteCommentsEvent}
                handleClickToAvatarAndName={item.handleClickToAvatarAndName}
                textReply={item.textReplyComment}
                textDelete={item.textDeleteComment}
                textCommentOfAuthor={item.t("Comment.commentAuthor")}
            />
            {
                hasChildren && (<>
                    <button
                        onClick={() => { setSeeMore(!seeMore) }}
                    >
                        <div style={{ color: COLOR_GREY, fontSize: 12 }}>{seeMore ? item.textHidden : item.textSeeMore}</div>
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
                                    textReplyComment={item.textReplyComment}
                                    textDeleteComment={item.textDeleteComment}
                                    textSeeMore={item.textSeeMore}
                                    textHidden={item.textHidden}
                                    t={item.t}
                                    userCreatedPostId={item.userCreatedPostId}
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
