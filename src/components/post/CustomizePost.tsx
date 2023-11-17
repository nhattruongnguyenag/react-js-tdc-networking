import React, { useCallback, useMemo, useState } from 'react'
import CustomizeHeaderPost from './CustomizeHeaderPost'
import CustomizeBodyPost from './CustomizeBodyPost'
import CustomizeBottomPost from './CustomizeBottomPost'
import CustomizeImage from './CustomizeImage'
import { Post } from '../../types/Post'
import { CLICK_SAVE_POST_EVENT, CLICK_SEE_RESULT_POST_EVENT, CLICK_SEE_LIST_CV_POST_EVENT, CLICK_DELETE_POST_EVENT, COMMENT_ACTION, GO_TO_PROFILE_ACTIONS, LIKE_ACTION, SHOW_LIST_USER_REACTED, TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST, CLICK_UN_SAVE_POST_EVENT } from '../../constants/Variables'
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
import { LIST_JOB_APPLY_PAGE, RECRUITMENT_DETAILS_PAGE, SURVEY_DETAILS_PAGE, USER_DETAILS_PAGE } from '../../constants/Page'
import { slugify } from '../../utils/CommonUtls'
import { isBlank } from '../../utils/ValidateUtils'
import { savePostAPI } from '../../api/CallAPI'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DefaultAvatar from '../common/DefaultAvatar'
import { TEXT_CREATE_COMMENTS, TEXT_LIST_PERSON_HAD_LIKE } from '../../constants/StringVietnamese'

const CustomizePost = (props: Post) => {
  const navigate = useNavigate()
  const [modalShow, setModalShow] = React.useState(false);
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
    setModalShow(true)
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
    const state = {
      userId: _userId,
      group: props.group,
    };
    navigate(`${USER_DETAILS_PAGE}/${slugify(props.name)}-${props.userId}`, { state });
  }

  const handleClickBtnRecruitmentDetailEvent = (idPost: number, title: string) => {
    navigate(`${RECRUITMENT_DETAILS_PAGE}/${slugify(title)}-${idPost}`)
  }

  const handleClickBtnSurveyDetailEvent = (idPost: number, title: string) => {
    navigate(`${SURVEY_DETAILS_PAGE}/${slugify(title)}-${idPost}`)
  }

  const handleSeeListCvPost = (idPost: number, title: string) => {
    navigate(`${LIST_JOB_APPLY_PAGE}/${slugify(title)}-${idPost}`)
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

  const handleClickMenuOption = (flag: number) => {
    switch (flag) {
      case CLICK_SAVE_POST_EVENT:
        handleSavePost();
        break
      case CLICK_UN_SAVE_POST_EVENT:
        handleSavePost();
        break;
      case CLICK_DELETE_POST_EVENT:
        // handleSavePost();
        // post.handleUnSave(post.id);
        break
      case CLICK_SEE_LIST_CV_POST_EVENT:
        handleSeeListCvPost(props.id, props.title || '');
        break
      case CLICK_SEE_RESULT_POST_EVENT:
        // handleSeeResultSurveyPost();
        break
      default:
        return '';
    }
  }

  const handleSavePost = async () => {
    const data = {
      "userId": userLogin?.id,
      "postId": props.id
    }
    const status = await savePostAPI(SERVER_ADDRESS + 'api/posts/user/save', data);
  }

  switch (props.type) {
    case TYPE_NORMAL_POST:
      return (
        <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
          {/* Header */}
          <CustomizeHeaderPost
            userId={props.userId}
            name={props.name}
            avatar={props.avatar}
            available={props.available}
            timeCreatePost={props.timeCreatePost}
            typeAuthor={props.typeAuthor}
            type={props.type}
            role={props.role}
            handleClickMenuOption={handleClickMenuOption}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
            isSave={props.isSave}
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
          <ModalUserLiked
            likes={props.likes}
            show={modalShow}
            onHide={() => setModalShow(false)}
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
            userId={props.userId}
            name={props.name}
            avatar={props.avatar}
            available={props.available}
            timeCreatePost={props.timeCreatePost}
            typeAuthor={props.typeAuthor}
            type={props.type}
            role={props.role}
            handleClickMenuOption={handleClickMenuOption}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
            isSave={props.isSave}
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
          <ModalUserLiked
            likes={props.likes}
            show={modalShow}
            onHide={() => setModalShow(false)}
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
          userId={props.userId}
          name={props.name}
          avatar={props.avatar}
          available={props.available}
          timeCreatePost={props.timeCreatePost}
          typeAuthor={props.typeAuthor}
          type={props.type}
          role={props.role}
          handleClickMenuOption={handleClickMenuOption}
          handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
          isSave={props.isSave}
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
        <ModalUserLiked
          likes={props.likes}
          show={modalShow}
          onHide={() => setModalShow(false)}
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



interface ModalType {
  show: boolean
  onHide: () => void,
  likes: Like[]
}

function ModalUserLiked(props: Readonly<ModalType>) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div className='header-modal'>
          <Modal.Title className='font-xss'>{TEXT_LIST_PERSON_HAD_LIKE}</Modal.Title>
          <button
            style={{ position: 'absolute', top: 0, right: 0 }}
            type='button'
            className='btn-close-modal-header close font-xl'
            onClick={props.onHide}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        {
          props.likes.map((item, index) => {

            return Boolean(item.image) ?
              <button className='userLikedWrapper' key={item.id}>
                <img alt='avatar' className='avatar-user-reacted-list me-1 shadow-sm list-user-liked'
                  src={SERVER_ADDRESS + 'api/images/' + item.image} />
                <span>
                  {item.name}
                </span>
              </button> :
              <button className='userLikedWrapper'>
                <DefaultAvatar key={item.id} name={item.name} size={35} styleBootstrap={'me-1 list-user-liked'} />
                <span>
                  {item.name}
                </span>
              </button>
          })
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
