import React, { useCallback } from 'react'
import CustomizeHeaderPost from './CustomizeHeaderPost'
import CustomizeBodyPost from './CustomizeBodyPost'
import CustomizeBottomPost from './CustomizeBottomPost'
import CustomizeImage from './CustomizeImage'
import { Post } from '../../types/Post'
import {
  COMMENT_ACTION,
  GO_TO_PROFILE_ACTIONS,
  LIKE_ACTION,
  SHOW_LIST_USER_REACTED,
  TYPE_NORMAL_POST,
  TYPE_RECRUITMENT_POST,
  TYPE_SURVEY_POST
} from '../../constants/Variables'
import { useAppSelector } from '../../redux/Hook'
import { Like } from '../../types/Like'
import { ImageGalleryDisplay } from '../../types/ImageGalleryDispaly'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import CustomizeSurveyPost from '../surveyPost/CustomizeSurveyPost'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'

const CustomizePost = (props: Post) => {
  const { userLogin, isOpenModalComments } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  // Header

  const handleClickIntoAvatarAndNameAndMenuEvent = (flag: number | null) => {
    if (flag === GO_TO_PROFILE_ACTIONS) {
      alert('go to profile user have id: ' + props.userId)
    } else {
      alert('menu')
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
    alert('click like')
    // const dataLike: LikeAction = {
    //   code: '',
    //   postId: post.id,
    //   userId: userLogin?.id ?? 0
    // }
    // props.likeAction(dataLike)
  }

  const handleClickIntoBtnIconComments = () => {
    alert('click comment')
    // dispatch(
    //   openModalComments({
    //     id: props.id
    //   })
    // )
  }

  const handleClickIntoListUserReactions = () => {
    alert('click user reacted')
    // dispatch(
    //     openModalUserReaction({
    //         likes: props.likes
    //     })
    // )
  }

  const handleClickBtnRecruitmentDetailEvent = (idPost: number) => {
    alert('click btn detail recruitment' + idPost)
  }

  const handleClickBtnSurveyDetailEvent = (idPost: number) => {
    alert('click btn detail survey' + idPost)
  }

  const changeDataToImagGallerys = useCallback(() => {
    const newImagesGallerys: ImageGalleryDisplay[] = props.images.map((element) => ({
      original: SERVER_ADDRESS + 'api/images/' + element.uri,
      thumbnail: SERVER_ADDRESS + 'api/images/' + element.uri
    }))
    return newImagesGallerys
  }, [])

  switch (props.type) {
    case TYPE_NORMAL_POST:
      return (
        <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
          {/* Header */}
          <CustomizeHeaderPost
            name={props.name}
            avatar={props.avatar}
            available={props.available}
            timeCreatePost={props.timeCreatePost}
            typeAuthor={props.typeAuthor}
            type={props.type}
            role={props.role}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
          />
          {/* Body */}
          <CustomizeBodyPost content={props.content} />
          {/* Image */}
          {props.images && props.images.length > 0 && <CustomizeImage images={changeDataToImagGallerys()} />}
          {/* Bottom */}
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
      )
    case TYPE_RECRUITMENT_POST:
      return (
        <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
          <CustomizeHeaderPost
            name={props.name}
            avatar={props.avatar}
            available={props.available}
            timeCreatePost={props.timeCreatePost}
            typeAuthor={props.typeAuthor}
            type={props.type}
            role={props.role}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
          />
          <CustomizeRecruitmentPost
            id={props.id}
            image={props.avatar}
            name={props.name}
            type={props.type}
            location={props.location ?? ''}
            title={props.title ?? ''}
            expiration={props.expiration ?? ''}
            salary={props.salary ?? ''}
            employmentType={props.employmentType ?? ''}
            handleClickBtnSeeDetailEvent={handleClickBtnRecruitmentDetailEvent}
            createdAt={props.timeCreatePost}
            role={props.role}
            typeAuthor={props.typeAuthor}
          />
          {/* Bottom */}
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
      )
    case TYPE_SURVEY_POST:
      return (
        <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
          <CustomizeHeaderPost
            name={props.name}
            avatar={props.avatar}
            available={props.available}
            timeCreatePost={props.timeCreatePost}
            typeAuthor={props.typeAuthor}
            type={props.type}
            role={props.role}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
          />
          <CustomizeSurveyPost
            id={props.id}
            image={props.avatar}
            name={props.name}
            type={props.type}
            title={props.title ?? ''}
            handleClickBtnSeeDetailEvent={handleClickBtnSurveyDetailEvent}
            createdAt={props.timeCreatePost}
            description={props.description ?? ''}
            typeAuthor={props.typeAuthor ?? ''}
            role={props.role ?? ''}
          />
          {/* Bottom */}
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
      )
    default:
      return null
  }
}

export default CustomizePost
