import React, { memo, useCallback, useMemo, useState } from 'react'
import CustomizeHeaderPost from './CustomizeHeaderPost'
import CustomizeBodyPost from './CustomizeBodyPost'
import CustomizeBottomPost from './CustomizeBottomPost'
import CustomizeImage from './CustomizeImage'
import { Post } from '../../types/Post'
import { CLICK_SAVE_POST_EVENT, CLICK_SEE_RESULT_POST_EVENT, CLICK_SEE_LIST_CV_POST_EVENT, CLICK_DELETE_POST_EVENT, COMMENT_ACTION, GO_TO_PROFILE_ACTIONS, LIKE_ACTION, SHOW_LIST_USER_REACTED, TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST, CLICK_UN_SAVE_POST_EVENT, STATUS_CREATED, STATUS_DELETED, CLICK_UPDATE_POST_EVENT } from '../../constants/Variables'
import { useAppSelector } from '../../redux/Hook'
import { Like } from '../../types/Like'
import { ImageGalleryDisplay } from '../../types/ImageGalleryDispaly'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import CustomizeSurveyPost from '../surveyPost/CustomizeSurveyPost'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
import { toast } from 'react-toastify'
import CustomizeCommentPost from '../comments/CustomizeCommentPost'
import CustomizeCreateCommentsToolbar from '../commentToolbar/CustomizeCreateCommentsToolbar'
import { useNavigate } from 'react-router-dom'
import { RECRUITMENT_DETAILS_PAGE, SURVEY_DETAILS_PAGE, SURVEY_RESULT_PAGE, USER_DETAILS_PAGE, LIST_JOB_APPLY_PAGE } from '../../constants/Page'
import { slugify } from '../../utils/CommonUtls'
import { deleteCommentAPI, deletePostAPI, getAllCommentAPI, likeAPI, savePostAPI } from '../../api/CallAPI'
import { TYPE_POST_BUSINESS, TYPE_POST_FACULTY } from '../../constants/StringVietnamese'
import '../../assets/css/comments.css'
import '../../assets/css/createCommentsToolbar.css'
import '../../assets/css/modal.css'
import '../../assets/css/post.css'
import { setTranslations, useTranslation } from 'react-multi-lang'
import vi from '../../translates/vi.json';
import en from '../../translates/en.json';
import jp from '../../translates/jp.json';
import { getFacultyTranslated } from '../../utils/TranslateFaculty'
import { formatVietNamCurrency } from '../../utils/FormatCurrency'
import { CreatePostModal } from '../modal/CustomizeNormalPostModal'
import { UpdateNormalPost } from '../../types/UpdateNormalPost'
import { ModalUserLiked } from '../modal/ModalUserLiked'
import { IMAGE_URL } from '../../constants/Path'
import { LikeAction } from '../../types/LikeActions'
setTranslations({ vi, en, jp })

const CustomizePost = (props: Post) => {
  const t = useTranslation();
  const navigate = useNavigate()
  const [flag, setFlag] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const { userLogin, userIdOfProfileNow } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isOpenComment, setIsOpenComments] = useState(false);
  const [createNormalPostModalShow, setCreateNormalPostModalShow] = useState(false);
  const [commentAuthorName, setCommentAuthorName] = useState<string>('');
  const [dataComments, setDataComments] = useState({
    postId: props.id,
    userId: userLogin?.id,
    content: "",
    parentCommentId: 0
  })

  const handleClickIntoAvatarAndNameAndMenuEvent = (flag: number | null) => {
    if (flag === GO_TO_PROFILE_ACTIONS) {
      handleClickToAvatarAndName(props.userId)
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
    
    props.iCustomizeLikeAction ? props.likeAction({
      ...data, 
      code: ''
    } as LikeAction) : callLikeAPI(data)
  }

  const callLikeAPI = async (data: any) => {
    const status = await likeAPI(SERVER_ADDRESS + 'api/posts/like', data)
    if (status !== STATUS_CREATED) {
      toast.error(t("Toast.toastNotifyHaveError"));
    }
  }

  const handleClickIntoBtnIconComments = () => {
    setIsOpenComments(!isOpenComment);
  }

  const handleClickIntoListUserReactions = () => {
    setModalShow(true)
  }

  const handleClickCreateCommentBtnEvent = (content: string, flag: boolean) => {
    if (flag) {
      dataComments.content = content;
      callCommentsAPI();
    }
  }

  const handleClickToCommentReplyEvent = (id: number, name: string) => {
    dataComments.parentCommentId = id;
    setCommentAuthorName(name);
  }

  const handleClickToDeleteCommentsEvent = async (id: number) => {
    const _data = {
      commentId: id,
      postId: props.id,
      userId: userLogin?.id
    }
    const status = await deleteCommentAPI(SERVER_ADDRESS + 'api/posts/comment/delete', _data)
    if (status !== STATUS_DELETED) {
      toast.error(t("Toast.toastNotifyHaveError"));
    }
  }

  const handleClickToAvatarAndName = (_userId: number) => {
    if (userIdOfProfileNow !== _userId) {
      const state = {
        userId: _userId,
        group: props.group,
      };
      setModalShow(false);
      setIsOpenComments(false);
      navigate(`${USER_DETAILS_PAGE}/${slugify(props.name)}-${state.userId}`, { state });
    }
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
      original: IMAGE_URL + element.uri,
      thumbnail: IMAGE_URL + element.uri
    }))
    return newImagesGallerys
  }, [props.images])

  const callCommentsAPI = () => {
    const _data = {
      "postId": dataComments.postId,
      "userId": dataComments.userId,
      "content": dataComments.content,
      "parentCommentId": dataComments.parentCommentId
    }
    getAllCommentAPI(SERVER_ADDRESS + 'api/posts/comment', _data);
    dataComments.parentCommentId = 0;
  }

  const handleClickMenuOption = (flag: number) => {
    switch (flag) {
      case CLICK_SAVE_POST_EVENT:
        props.iCustomizeLikeAction ? props.handleUnSave(props.id) : handleSavePost();
        break;
      case CLICK_UN_SAVE_POST_EVENT:
        props.iCustomizeLikeAction ? props.handleUnSave(props.id) : handleSavePost();
        break;
      case CLICK_DELETE_POST_EVENT:
        handleDeletePostEvent();
        break
      case CLICK_SEE_LIST_CV_POST_EVENT:
        handleSeeListCvPost(props.id, props.title || '');
        break
      case CLICK_SEE_RESULT_POST_EVENT:
        navigate(`${SURVEY_RESULT_PAGE}/${slugify(props.title ?? '')}-${props.id}`)
        break
      case CLICK_UPDATE_POST_EVENT:
        if (props.type.includes(TYPE_NORMAL_POST)) {
          setCreateNormalPostModalShow(true)
        }
        break;
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
    if (status !== STATUS_CREATED) {
      toast.error(t("Toast.toastNotifyHaveError"));
    }
  }

  const handleDeletePostEvent = async () => {
    const status = await deletePostAPI(SERVER_ADDRESS + 'api/posts/', props.id);
    if (status !== STATUS_DELETED) {
      toast.error(t("Toast.toastNotifyHaveError"));
    }
  }

  const handleIdentifyTypeAuthor = (type: string) => {
    if (type == TYPE_POST_FACULTY) {
      return t("Post.normalPostIdentifyAuthorFaculty")
    } else if (type == TYPE_POST_BUSINESS) {
      return t("Post.normalPostIdentifyAuthorCompany")
    } else {
      return null;
    }
  }

  const handleUpdateNormalPostEvent = useMemo((): UpdateNormalPost => {
    const updateNormalPost: UpdateNormalPost = {
      postId: props.id,
      content: props.content,
      images: props.images
    };
    return updateNormalPost;
  }, [props])


  const getInterfaceClassification = () => {
    switch (props.type) {
      case TYPE_NORMAL_POST:
        return (
          <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
            {/* Header */}
            <CustomizeHeaderPost
              t={t}
              userId={props.userId}
              name={getFacultyTranslated(props.name, t)}
              avatar={props.avatar}
              available={props.available}
              timeCreatePost={props.timeCreatePost}
              typeAuthor={handleIdentifyTypeAuthor(props.typeAuthor ?? '')}
              type={props.type}
              role={props.role}
              handleClickMenuOption={handleClickMenuOption}
              handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
              isSave={props.isSave}
              active={props.active}
            />
            {/* Body */}
            <CustomizeBodyPost t={t} content={props.content} />
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
              textLike={t("Post.normalPostLike")}
              textComments={t("Post.normalPostComment")}
            />
            <ModalUserLiked
              t={t}
              likes={props.likes}
              show={modalShow}
              onHide={() => setModalShow(false)}
              handleClickToAvatarAndName={handleClickToAvatarAndName}
            />
            {
              isOpenComment && <>
                <div className='createCommentWrapper'>
                  <CustomizeCommentPost
                    userCreatedPostId={props.userId}
                    comments={props.comments}
                    handleClickToCommentReplyEvent={handleClickToCommentReplyEvent}
                    handleClickToDeleteCommentsEvent={handleClickToDeleteCommentsEvent}
                    handleClickToAvatarAndName={handleClickToAvatarAndName}
                    textReplyComment={t("Comment.commentReplyComment")}
                    textDeleteComment={t("Comment.commentDeleteComment")}
                    textSeeMore={t("CommentContainer.commentContainerComponentSeeMore")}
                    textHidden={t("CommentContainer.commentContainerComponentHidden")}
                    t={t}
                  />
                </div>
                <CustomizeCreateCommentsToolbar
                  t={t}
                  image={userLogin?.image ?? ''}
                  name={userLogin?.name ?? ''}
                  tagName={commentAuthorName}
                  handleClickCreateCommentBtnEvent={handleClickCreateCommentBtnEvent}
                  textCreateCommentOfButton={t("CreateCommentToolbar.commentCreateComment")}
                  textCreateCommentPlaceholderInput={t("CreateCommentToolbar.commentPlaceholderInput")}
                />
              </>
            }
          </div>
        )
      case TYPE_RECRUITMENT_POST:
        return (
          <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
            <CustomizeHeaderPost
              t={t}
              userId={props.userId}
              name={getFacultyTranslated(props.name, t)}
              avatar={props.avatar}
              available={props.available}
              timeCreatePost={props.timeCreatePost}
              typeAuthor={t("RecruitmentPost.recruitmentPostType")}
              type={props.type}
              role={props.role}
              handleClickMenuOption={handleClickMenuOption}
              handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
              isSave={props.isSave}
              active={props.active}
            />
            <CustomizeRecruitmentPost
              id={props.id}
              image={props.avatar}
              name={getFacultyTranslated(props.name, t)}
              type={props.type}
              location={props.location ?? ''}
              title={props.title ?? ''}
              expiration={props.expiration ?? ''}
              salary={formatVietNamCurrency(props.salary ?? '')}
              employmentType={props.employmentType ?? ''}
              handleClickBtnSeeDetailEvent={handleClickBtnRecruitmentDetailEvent}
              createdAt={props.timeCreatePost}
              role={props.role}
              typeAuthor={props.typeAuthor}
              textButtonSeeDetail={t("RecruitmentPost.recruitmentPostButtonSeeDetail")}
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
              textLike={t("Post.normalPostLike")}
              textComments={t("Post.normalPostComment")}
            />
            <ModalUserLiked
              t={t}
              likes={props.likes}
              show={modalShow}
              onHide={() => setModalShow(false)}
              handleClickToAvatarAndName={handleClickToAvatarAndName}
            />
            {
              isOpenComment && <>
                <div className='createCommentWrapper'>
                  <CustomizeCommentPost
                    userCreatedPostId={props.userId}
                    comments={props.comments}
                    handleClickToCommentReplyEvent={handleClickToCommentReplyEvent}
                    handleClickToDeleteCommentsEvent={handleClickToDeleteCommentsEvent}
                    handleClickToAvatarAndName={handleClickToAvatarAndName}
                    textReplyComment={t("Comment.commentReplyComment")}
                    textDeleteComment={t("Comment.commentDeleteComment")}
                    textSeeMore={t("CommentContainer.commentContainerComponentSeeMore")}
                    textHidden={t("CommentContainer.commentContainerComponentHidden")}
                    t={t}
                  />
                </div>
                <CustomizeCreateCommentsToolbar
                  t={t}
                  image={userLogin?.image ?? ''}
                  name={userLogin?.name ?? ''}
                  tagName={commentAuthorName}
                  handleClickCreateCommentBtnEvent={handleClickCreateCommentBtnEvent}
                  textCreateCommentOfButton={t("CreateCommentToolbar.commentCreateComment")}
                  textCreateCommentPlaceholderInput={t("CreateCommentToolbar.commentPlaceholderInput")}
                />
              </>
            }
          </div>
        )
      case TYPE_SURVEY_POST:
        return <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
          <CustomizeHeaderPost
            t={t}
            userId={props.userId}
            name={getFacultyTranslated(props.name, t)}
            avatar={props.avatar}
            available={props.available}
            timeCreatePost={props.timeCreatePost}
            typeAuthor={t("SurveyPost.surveyPostType")}
            type={props.type}
            role={props.role}
            handleClickMenuOption={handleClickMenuOption}
            handleClickIntoAvatarAndNameAndMenuEvent={handleClickIntoAvatarAndNameAndMenuEvent}
            isSave={props.isSave}
            active={props.active}
          />
          <CustomizeSurveyPost
            id={props.id}
            image={props.avatar}
            name={getFacultyTranslated(props.name, t)}
            type={props.type}
            title={props.title ?? ''}
            handleClickBtnSeeDetailEvent={handleClickBtnSurveyDetailEvent}
            createdAt={props.timeCreatePost}
            description={props.description ?? ''}
            typeAuthor={props.typeAuthor ?? ''}
            role={props.role ?? ''}
            isConduct={0}
            textSurveyPostButton={t("SurveyPost.surveyPostButton")}
            textSurveyPostButtonSetting={t("SurveyPost.surveyPostButtonSetting")}
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
            textLike={t("Post.normalPostLike")}
            textComments={t("Post.normalPostComment")}
          />
          <ModalUserLiked
            t={t}
            likes={props.likes}
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleClickToAvatarAndName={handleClickToAvatarAndName}
          />
          {
            isOpenComment && <div>
              <div className='createCommentWrapper'>
                <CustomizeCommentPost
                  userCreatedPostId={props.userId}
                  comments={props.comments}
                  handleClickToCommentReplyEvent={handleClickToCommentReplyEvent}
                  handleClickToDeleteCommentsEvent={handleClickToDeleteCommentsEvent}
                  handleClickToAvatarAndName={handleClickToAvatarAndName}
                  textReplyComment={t("Comment.commentReplyComment")}
                  textDeleteComment={t("Comment.commentDeleteComment")}
                  textSeeMore={t("CommentContainer.commentContainerComponentSeeMore")}
                  textHidden={t("CommentContainer.commentContainerComponentHidden")}
                  t={t}
                />
              </div>
              <CustomizeCreateCommentsToolbar
                t={t}
                image={userLogin?.image ?? ''}
                name={userLogin?.name ?? ''}
                tagName={commentAuthorName}
                handleClickCreateCommentBtnEvent={handleClickCreateCommentBtnEvent}
                textCreateCommentOfButton={t("CreateCommentToolbar.commentCreateComment")}
                textCreateCommentPlaceholderInput={t("CreateCommentToolbar.commentPlaceholderInput")}
              />
            </div>
          }
        </div>
      default:
        return null
    }
  }

  return (
    <>
      {
        getInterfaceClassification()
      }
      <CreatePostModal
        show={createNormalPostModalShow}
        onHide={() => setCreateNormalPostModalShow(false)}
        group={0}
        t={t}
        updateNormalPost={handleUpdateNormalPostEvent}
      />
    </>
  )
}

export default memo(CustomizePost)