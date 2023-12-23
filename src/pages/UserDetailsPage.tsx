import React, { useEffect, useRef, useState } from 'react'
import { numberDayPassed } from '../utils/FormatTime'
import Header from '../components/common/Header'
import { useGetPostsByIdQuery } from '../redux/Service'
import { LikeAction } from '../types/LikeActions'
import CustomizePost from '../components/post/CustomizePost'
import { useAppSelector } from '../redux/Hook'
import CustomizeProfile from '../components/profile/CustomizeProfile'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getIdFromSlug } from '../utils/CommonUtls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { COLOR_GREY } from '../constants/Color'
import CustomizeSkeletonUserProfile from '../components/skeleton/CustomizeSkeletonUserProfile'
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton'
import { getGroupForPost } from '../utils/GetGroup'
import {
  AVATAR_CLICK,
  AVATAR_CLICK_UPLOAD,
  BACKGROUND_CLICK,
  BACKGROUND_CLICK_UPLOAD,
  CALL_ACTION,
  CHANGE_INFO_USER_CLICK_ACTION,
  CLICK_CAMERA_AVATAR_EVENT,
  CLICK_CAMERA_BACKGROUND_EVENT,
  FOLLOW_ACTION,
  MENU_CLICK_ACTION,
  MESSENGER_ACTION,
  SEE_AVATAR,
  SEE_BACKGROUND
} from '../constants/Variables'
import '../assets/css/profile.css'
import { followAPI, updateImageUserProfile } from '../api/CallAPI'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useDispatch } from 'react-redux'
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen, setSelectConversation, setUserLogin } from '../redux/Slice'
import { useTranslation } from 'react-multi-lang'
import { getFacultyTranslated } from '../utils/TranslateFaculty'
import { TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese'
import ModalUpdateStudent from '../components/update/updateProfile/ModalUpdateStudent'
import ModalUpdateFaculty from '../components/update/updateProfile/ModalUpdateFaculty'
import ModalUpdateBusiness from '../components/update/updateProfile/ModalUpdateBusiness'
import { CustomizeModalOption } from '../components/modal/CustomizeModalOption'
import { CustomizeModalShowImage } from '../components/modal/CustomizeModalShowImage'
import { CustomizeShowImageToUpload } from '../components/modal/CustomizeShowImageToUpload'
import { handleUploadImage } from '../utils/UploadUtils'
import { Faculty } from '../types/Faculty'
import { Business } from '../types/Business'
import { Student } from '../types/Student'
import { toast } from 'react-toastify'
import { getPostActive } from '../utils/GetPostActive'
import { Conversation } from '../types/Conversation'
import moment from 'moment'
import { MESSAGE_PAGE } from '../constants/Page'
import ButtonBackToTop from '../components/common/ButtonBackToTop'

interface UserInformation {
  userId: number
  background?: string | undefined
  avatar: string | undefined
}

export default function UserDetailsPage() {
  const [isFocused, setIsFocused] = useState(false)
  const t = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalShowOption, setModalShowOption] = React.useState(false)
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false)
  const [modalShowImage, setModalShowImage] = React.useState<boolean>(false)
  const [isShowBackGround, setIsShowBackGround] = React.useState<boolean>(false)
  const [imageShow, setImageShow] = React.useState<string>('')
  const [modalShowImageAvatarUpload, setModalShowImageAvatarUpload] = React.useState<boolean>(false)
  const [modalShowImageBackgroundUpload, setModalShowImageBackgroundUpload] = React.useState<boolean>(false)
  const { slug } = useParams()
  const userId = getIdFromSlug(slug ?? '')
  const location = useLocation()
  const { group } = location.state || {}
  const [post, setPost] = useState<any[]>([])
  const [userInfo, setUserInfo] = useState<any>()
  const [typeAuthorPost, setTypeAuthorPost] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isFollow, setIsFollow] = useState<boolean>(false)
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const fileInputRefAvatar = useRef<HTMLInputElement | null>(null)
  const fileInputRefBackground = useRef<HTMLInputElement | null>(null)
  const [imageAvatarChange, setImageAvatarChange] = useState<string>('')
  const [imageBackgroundChange, setImageBackgroundChange] = useState<string>('')
  const [userInformationChangeBackground, setUserInformationChangeBackground] = useState<UserInformation>({
    userId: userId ?? 0,
    avatar: undefined,
    background: ''
  })
  const [userInformationChangeAvatar, setUserInformationChangeAvatar] = useState<UserInformation>({
    userId: userId ?? 0,
    background: undefined,
    avatar: ''
  })
  const { data, isFetching } = useGetPostsByIdQuery(
    {
      userId: userId ?? 0,
      groupCode: group,
      userLogin: userLogin?.id ?? 0
    },
    {
      pollingInterval: 500
    }
  )

  const handleGetFilesAvatar = () => {
    if (fileInputRefAvatar.current) {
      fileInputRefAvatar.current.showPicker()
      fileInputRefAvatar.current.value = ''
    }
  }

  const handleGetFilesBackground = () => {
    if (fileInputRefBackground.current) {
      fileInputRefBackground.current.showPicker()
      fileInputRefBackground.current.value = ''
    }
  }

  const onSelectUploadImageAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setImageAvatarChange(URL.createObjectURL(event.target.files[0]))
      handleUploadImage(event.target.files, (response) => {
        setUserInformationChangeAvatar((prevUserInformation) => ({
          ...prevUserInformation,
          avatar: response.data[0]
        }))
        setModalShowImageAvatarUpload(true)
      })
    }
  }

  const onSelectUploadImageBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setImageBackgroundChange(URL.createObjectURL(event.target.files[0]))
      handleUploadImage(event.target.files, (response) => {
        setUserInformationChangeBackground((prevUserInformation) => ({
          ...prevUserInformation,
          background: response.data[0]
        }))
        setModalShowImageBackgroundUpload(true)
      })
    }
  }

  useEffect(() => {
    if (data) {
      setIsLoading(false)
      setTypeAuthorPost(data.data.user['roleCodes'])
      setUserInfo(data.data.user)
      setPost(data.data.posts)
      setIsFollow(data.data.isFollow)
    }
  }, [data])

  useEffect(() => {
    reloadingPageEvent()
  }, [userId])

  const handleUnSave = (post_id: number) => {
    // Todo
  }

  const likeAction = (obj: LikeAction) => {
    // Todo
  }

  useEffect(() => {
    setIsFocused(true)
    dispatch(setCurrentScreenNowIsProfileScreen(true))
    dispatch(goToProfileScreen(userId ?? -1))
    return () => {
      setIsFocused(false)
      dispatch(setCurrentScreenNowIsProfileScreen(false))
      dispatch(goToProfileScreen(-1))
    }
  }, [])

  const renderItem = (item: any) => {
    if (getPostActive(item.active)) {
      return (
        <CustomizePost
          id={item.id}
          userId={item.user['id']}
          name={item.user['name']}
          avatar={item.user['image']}
          typeAuthor={
            userInfo?.roleCodes !== '' && userInfo?.roleCodes.includes(TYPE_POST_FACULTY)
              ? TYPE_POST_FACULTY
              : TYPE_POST_BUSINESS
          }
          available={null}
          timeCreatePost={numberDayPassed(item.createdAt)}
          content={item.content}
          type={item.type}
          likes={item.likes}
          comments={item.comment}
          commentQty={item.commentQuantity}
          images={item.images}
          role={item.user['roleCodes']}
          likeAction={likeAction}
          location={item.location ?? null}
          title={item.title ?? null}
          expiration={item.expiration ?? null}
          salary={item.salary ?? null}
          employmentType={item.employmentType ?? null}
          description={item.description ?? null}
          isConduct={null}
          isSave={item.isSave}
          group={group}
          handleUnSave={handleUnSave}
          active={item.active} iCustomizeLikeAction={false}        />
      )
    } else {
      return null
    }
  }

  const handleClickButtonEvent = (flag: number) => {
    switch (flag) {
      case MESSENGER_ACTION:
        if (userLogin) {
          let conversation: Conversation = {
            id: -1,
            countNewMessage: 0,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            lastMessageContent: '',
            lastMessageSentAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            lastMessageType: '',
            receiver: userInfo,
            sender: userLogin
          }
          dispatch(setSelectConversation(conversation))
          navigate(MESSAGE_PAGE)
        }

        break
      case FOLLOW_ACTION:
        handleClickFollowEvent()
        break
      case CALL_ACTION:
        alert('call')
        break
      case CHANGE_INFO_USER_CLICK_ACTION:
        handleClickIntoButtonMenuChangeUserInfoEvent()
        break
      case AVATAR_CLICK:
        setIsShowBackGround(false)
        setImageShow(userInfo?.image ?? '')
        setModalShowImage(true)
        break
      case BACKGROUND_CLICK:
        setIsShowBackGround(true)
        setImageShow(userInfo?.background ?? '')
        setModalShowImage(true)
        break
      case MENU_CLICK_ACTION:
        handleClickIntoButtonMenu3dotEvent()
        break
      case AVATAR_CLICK_UPLOAD:
        handleGetFilesAvatar()
        break
      case BACKGROUND_CLICK_UPLOAD:
        handleGetFilesBackground()
        break
      default:
        break
    }
  }

  const handleClickFollowEvent = async () => {
    const followData = {
      userFollowId: userId,
      userId: userLogin?.id
    }
    const status = await followAPI(SERVER_ADDRESS + 'api/users/follow', followData)
    setIsFollow(!isFollow)
  }

  const handleClickIntoButtonMenu3dotEvent = () => {
    setModalShowOption(true)
  }

  const handleClickIntoButtonMenuChangeUserInfoEvent = () => {
    setModalShowUpdate(true)
  }

  const getFacultyByGroupCodeByFaculty = (group: string): string => {
    let faculty = group.substring(group.indexOf('_') + 1)
    faculty = 'group_' + faculty
    return faculty
  }

  const handleSelectImageToUpload = async (isBackground: boolean, flag: boolean) => {
    if (flag) {
      if (isBackground) {
        const status = await updateImageUserProfile(SERVER_ADDRESS + 'api/users/change/image', {
          ...userInformationChangeBackground
        })
        printfNotifications(status)
      } else {
        const status = await updateImageUserProfile(SERVER_ADDRESS + 'api/users/change/image', {
          ...userInformationChangeAvatar
        })
        printfNotifications(status)
        let tempData: Student | Faculty | Business | null = userLogin
        if (tempData) {
          tempData = { ...tempData, image: userInformationChangeAvatar.avatar ?? '' }
          dispatch(setUserLogin(tempData))
        }
      }
    }
    setImageBackgroundChange('')
    setImageAvatarChange('')
  }

  const printfNotifications = (status: number) => {
    status === 200
      ? toast.success(t('Toast.toastUpdateProfileSuccess'))
      : toast.success(t('Toast.toastUpdateProfileUnSuccess'))
  }

  const handleClickIntoHeaderComponentEvent = (flag: number) => {
    switch (flag) {
      case CLICK_CAMERA_AVATAR_EVENT:
        console.log('CLICK_CAMERA_AVATAR_EVENT')
        break
      case CLICK_CAMERA_BACKGROUND_EVENT:
        console.log('CLICK_CAMERA_BACKGROUND_EVENT')
        break
      case SEE_AVATAR:
        console.log('SEE_AVATAR')
        setImageShow(userInfo?.image ?? '')
        break
      case SEE_BACKGROUND:
        console.log('SEE_BACKGROUND')
        setImageShow(userInfo?.background ?? '')
        break
      default:
        break
    }
  }

  const reloadingPageEvent = function () {
    window.scrollTo(0, 0)
  }

  const checkRole = () => {
    switch (userInfo?.roleCodes ?? '') {
      case TYPE_POST_STUDENT:
        return (
          <ModalUpdateStudent
            t={t}
            show={modalShowUpdate}
            onHide={() => setModalShowUpdate(false)}
            user={userInfo}
            nameHadTranslated={getFacultyTranslated(userInfo?.name + '', t)}
          />
        )
      case TYPE_POST_FACULTY:
        return (
          <ModalUpdateFaculty
            t={t}
            show={modalShowUpdate}
            onHide={() => setModalShowUpdate(false)}
            user={userInfo}
            nameHadTranslated={getFacultyTranslated(userInfo?.name + '', t)}
          />
        )
      case TYPE_POST_BUSINESS:
        return (
          <ModalUpdateBusiness
            t={t}
            show={modalShowUpdate}
            onHide={() => setModalShowUpdate(false)}
            user={userInfo}
            nameHadTranslated={getFacultyTranslated(userInfo?.name + '', t)}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='row feed-body'>
              {isLoading ? (
                <div className='card shadow-xss rounded-xxl col-12 mb-3 border-0 p-4'>
                  <CustomizeSkeletonUserProfile />
                  <div className='spaceSkletonUserProfile'></div>
                  <CustomizeSkeleton />
                </div>
              ) : (
                <div className='col-12'>
                  <CustomizeProfile
                    t={t}
                    isFollow={isFollow}
                    isSameUser={userLogin?.id === userId}
                    data={post ? post : []}
                    role={typeAuthorPost}
                    userData={userInfo}
                    handleClickButtonEvent={handleClickButtonEvent}
                    handleClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent}
                  />
                  {Boolean(group) && Boolean(getGroupForPost(group, t)) && (
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4 '>
                      <div className='snippet wrapperTitleUserProfile mt-2' data-title='.dot-typing'>
                        <span className='txtTitleInUserProfile text-grey-900 text-dark'>
                          {getFacultyTranslated(userInfo?.name + '', t)}{' '}
                          <FontAwesomeIcon
                            className='iconArrowToRightUserProfile'
                            icon={faPlay}
                            size='1x'
                            color={COLOR_GREY}
                          />{' '}
                          {getGroupForPost(group, t)}
                        </span>
                      </div>
                    </div>
                  )}
                  {Boolean(post) &&
                    post?.length !== 0 &&
                    post.map((item, index) => {
                      return renderItem(item)
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomizeModalOption show={modalShowOption} onHide={() => setModalShowOption(false)} />
      <CustomizeModalShowImage
        typeImage={isShowBackGround}
        name={userInfo?.name ?? ''}
        image={imageShow}
        show={modalShowImage}
        onHide={() => {
          setModalShowImage(false)
        }}
      />

      {/* avatar */}
      <CustomizeShowImageToUpload
        isBackground={false}
        name={t('Profile.uploadAvatarTitle')}
        image={imageAvatarChange}
        show={modalShowImageAvatarUpload}
        onHide={() => setModalShowImageAvatarUpload(false)}
        onSelectImage={handleSelectImageToUpload}
      />
      {/* background */}
      <CustomizeShowImageToUpload
        isBackground={true}
        name={t('Profile.uploadBackgroundTitle')}
        image={imageBackgroundChange}
        show={modalShowImageBackgroundUpload}
        onHide={() => setModalShowImageBackgroundUpload(false)}
        onSelectImage={handleSelectImageToUpload}
      />

      {checkRole()}
      {/* input file avatar*/}
      <input
        type={'file'}
        multiple
        ref={fileInputRefAvatar}
        className='hidden'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageAvatar(event)}
      />
      {/* input file background*/}
      <input
        type={'file'}
        multiple
        ref={fileInputRefBackground}
        className='hidden'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageBackground(event)}
      />
      {/*  */}
      <ButtonBackToTop />
    </>
  )
}
