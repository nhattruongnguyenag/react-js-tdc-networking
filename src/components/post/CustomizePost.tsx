import React from 'react'
import CustomizeHeaderPost from './CustomizeHeaderPost'
import CustomizeBodyPost from './CustomizeBodyPost'
import CustomizeBottomPost from './CustomizeBottomPost'
import CustomizeImage from './CustomizeImage'
import { Post } from '../../types/Post'
import { COMMENT_ACTION, GO_TO_PROFILE_ACTIONS, LIKE_ACTION, SHOW_LIST_USER_REACTED } from '../../constants/Variables'
import { useAppSelector } from '../../redux/Hook'
import { Like } from '../../types/Like'

const CustomizePost = (props: Post) => {
    const { userLogin, isOpenModalComments } = useAppSelector((state) => state.TDCSocialNetworkReducer)

    // Header

    const handleClickIntoAvatarAndNameAndMenuEvent = (flag: number | null) => {
        if (flag === GO_TO_PROFILE_ACTIONS) {
            console.log('go to profile user have id: ' + props.userId)
        } else {
            console.log('show menu')
        }
    }

    // Bottom area

    const checkLiked = (likes: Like[], userId: number | undefined) => {
        let result = false
        likes.some((item: any) => {
            if (item.id === userId) {
                result = true
            }
        })
        return result
    }

    const handleClickBottomBtnEvent = async (flag: number | null) => {
        if (flag === LIKE_ACTION) {
            handleClickIntoBtnIconLikeEvent()
        } else if (flag === COMMENT_ACTION) {
            handleClickIntoBtnIconComments()
        } else if (flag === SHOW_LIST_USER_REACTED) {
            handleClickIntoListUserReactions()
        }
    }


    const handleClickIntoBtnIconLikeEvent = async () => {
        console.log('like');
        // const dataLike: LikeAction = {
        //   code: '',
        //   postId: post.id,
        //   userId: userLogin?.id ?? 0
        // }
        // props.likeAction(dataLike)
    }

    const handleClickIntoBtnIconComments = () => {
        console.log('comment');
        // dispatch(
        //   openModalComments({
        //     id: props.id
        //   })
        // )
    }

    const handleClickIntoListUserReactions = () => {
        console.log('show list user reacted');

        // dispatch(
        //     openModalUserReaction({
        //         likes: props.likes
        //     })
        // )
    }

    return (
        <>
            <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                <CustomizeHeaderPost
                    name={props.name}
                    avatar={props.avatar}
                    typeAuthor={props.typeAuthor}
                    available={props.available}
                    timeCreatePost={props.timeCreatePost}
                    type={props.type}
                    role={props.role}
                    handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
                />
                <CustomizeBodyPost
                    content={props.content}
                />
                <CustomizeImage />
                <CustomizeBottomPost
                    id={props.id}
                    userLoginId={userLogin?.id}
                    role={props.role}
                    isLike={checkLiked(props.likes, userLogin?.id)}
                    likes={props.likes}
                    comments={props.comments}
                    handleClickBottomBtnEvent={handleClickBottomBtnEvent}
                    commentQty={props.commentQty}
                />
            </div>
        </>
    )
}

export default CustomizePost
