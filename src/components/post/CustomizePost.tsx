import React, { useCallback, useState } from 'react'
import CustomizeHeaderPost from './CustomizeHeaderPost'
import CustomizeBodyPost from './CustomizeBodyPost'
import CustomizeBottomPost from './CustomizeBottomPost'
import CustomizeImage from './CustomizeImage'
import { Post } from '../../types/Post'
import { COMMENT_ACTION, GO_TO_PROFILE_ACTIONS, LIKE_ACTION, SHOW_LIST_USER_REACTED, TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST } from '../../constants/Variables'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { Like } from '../../types/Like'
import { ImageGalleryDisplay } from '../../types/ImageGalleryDispaly'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import CustomizeSurveyPost from '../surveyPost/CustomizeSurveyPost'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
import axios from 'axios'
import { toast } from 'react-toastify'
import CustomizeCommentPost from './CustomizeCommentPost'
import CustomizeCreateCommentsToolbar from '../commentToolbar/CustomizeCreateCommentsToolbar'
import { useNavigate } from 'react-router-dom'
import { RECRUITMENT_DETAILS_PAGE, SURVEY_DETAILS_PAGE, USER_DETAILS_PAGE } from '../../constants/Page'
import { slugify } from '../../utils/CommonUtls'
import { isBlank } from '../../utils/ValidateUtils'

const CustomizePost = (props: Post) => {
  const navigate = useNavigate()
  const { userLogin, isOpenModalComments } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isOpenComment, setIsOpenComments] = useState(false);
  const [commentAuthorName, setCommentAuthorName] = useState<string>('');
  const [dataComments, setDataComments] = useState({
    postId: props.id,
    userId: userLogin?.id,
    content: "",
    parentCommentId: 0
  })
  const dispatch = useAppDispatch()

  const handleClickIntoAvatarAndNameAndMenuEvent = (flag: number | null) => {
    if (flag === GO_TO_PROFILE_ACTIONS) {
      handleClickToAvatarAndName(props.userId)
    } else {
      alert('menu')
    }
  }

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
    const data = {
      "postId": props.id,
      "userId": userLogin?.id
    }
    callLikeAPI(data)
  }

  const callLikeAPI = (data: any) => {
    axios.post(SERVER_ADDRESS + 'api/posts/like', data)
      .then((response) => {
        if (response.data.status !== 201) {
          toast.error('Lỗi hệ thống vui lòng thử lại sau!')
        }
      }).catch((error) => {
        toast.error('Lỗi hệ thống vui lòng thử lại sau!')
      })
  }

  const handleClickIntoBtnIconComments = () => {
    setIsOpenComments(!isOpenComment);
  }

  const handleClickIntoListUserReactions = () => {
    alert('click user reacted')
  }

  const handleClickCreateCommentBtnEvent = (content: string) => {
    dataComments.content = content;
    if (isBlank(dataComments.content.trim())) {
      toast.error('Nội dung bài bình luận không thể để trống!')
    } else {
      callCommentsAPI();
    }
  }

  const handleClickToCommentReplyEvent = (id: number, name: string) => {
    dataComments.parentCommentId = id;
    setCommentAuthorName(name);
  }

  const handleClickToDeleteCommentsEvent = (id: number) => {
    callDeleteCommentAPI(id);
  }

  const handleClickToAvatarAndName = (_userId: number) => {
    navigate(`${USER_DETAILS_PAGE}/${slugify(props.name)}-${props.userId}`)
  }

  const handleClickBtnRecruitmentDetailEvent = (idPost: number, title: string) => {
    navigate(`${RECRUITMENT_DETAILS_PAGE}/${slugify(title)}-${idPost}`)
  }

  const handleClickBtnSurveyDetailEvent = (idPost: number, title: string) => {
    navigate(`${SURVEY_DETAILS_PAGE}/${slugify(title)}-${idPost}`)
  }

  const changeDataToImagGallerys = useCallback(() => {
    const newImagesGallerys: ImageGalleryDisplay[] = props.images.map((element) => ({
      original: SERVER_ADDRESS + 'api/images/' + element.uri,
      thumbnail: SERVER_ADDRESS + 'api/images/' + element.uri
    }))
    return newImagesGallerys
  }, [])

  const callCommentsAPI = () => {
    axios.post(SERVER_ADDRESS + 'api/posts/comment', {
      "postId": dataComments.postId,
      "userId": dataComments.userId,
      "content": dataComments.content,
      "parentCommentId": dataComments.parentCommentId
    })
      .then((response) => {
        if (response.data.status !== 201) {
          toast.error('Tạo comment thất bại')
        }
      })
      .catch((error) => {
        toast.error('Tạo comment thất bại')
      })
    dataComments.parentCommentId = 0;
  }

  const callDeleteCommentAPI = (id: number) => {
    axios.delete(SERVER_ADDRESS + 'api/posts/comment/delete', {
      data: {
        commentId: id,
        postId: props.id,
        userId: userLogin?.id
      }
    })
      .then((response) => {
        if (response.data.status !== 200) {
          toast.error('Xóa comment thất bại')
        }
      })
      .catch((error) => {
        toast.error('Xóa comment thất bại')
      })
  }

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
          {
            isOpenComment && <>
              <CustomizeCommentPost comments={props.comments}
                handleClickToCommentReplyEvent={handleClickToCommentReplyEvent}
                handleClickToDeleteCommentsEvent={handleClickToDeleteCommentsEvent}
                handleClickToAvatarAndName={handleClickToAvatarAndName}
              />
              <CustomizeCreateCommentsToolbar
                image={userLogin?.image ?? ''}
                name={userLogin?.name ?? ''}
                tagName={commentAuthorName}
                handleClickCreateCommentBtnEvent={handleClickCreateCommentBtnEvent}
              />
            </>
          }
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
            typeAuthor={'Tuyển dụng'}
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
          {
            isOpenComment && <>
              <CustomizeCommentPost comments={props.comments}
                handleClickToCommentReplyEvent={handleClickToCommentReplyEvent}
                handleClickToDeleteCommentsEvent={handleClickToDeleteCommentsEvent}
                handleClickToAvatarAndName={handleClickToAvatarAndName}
              />
              <CustomizeCreateCommentsToolbar
                image={userLogin?.image ?? ''}
                name={userLogin?.name ?? ''}
                tagName={commentAuthorName}
                handleClickCreateCommentBtnEvent={handleClickCreateCommentBtnEvent}
              />
            </>
          }
        </div>
      )
    case TYPE_SURVEY_POST:
      return <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
        <CustomizeHeaderPost
          name={props.name}
          avatar={props.avatar}
          available={props.available}
          timeCreatePost={props.timeCreatePost}
          typeAuthor={'Khảo sát'}
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
          isConduct={0}
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
        {
          isOpenComment && <>
            <CustomizeCommentPost
              comments={props.comments}
              handleClickToCommentReplyEvent={handleClickToCommentReplyEvent}
              handleClickToDeleteCommentsEvent={handleClickToDeleteCommentsEvent}
              handleClickToAvatarAndName={handleClickToAvatarAndName}
            />
            <CustomizeCreateCommentsToolbar
              image={userLogin?.image ?? ''}
              name={userLogin?.name ?? ''}
              tagName={commentAuthorName}
              handleClickCreateCommentBtnEvent={handleClickCreateCommentBtnEvent}
            />
          </>
        }
      </div>
    default:
      return null
  }
}

export default CustomizePost
