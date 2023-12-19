import React, { useEffect, useState } from 'react'
import { numberDayPassed } from '../utils/FormatTime';
import Header from '../components/common/Header';
import { useGetPostsByIdQuery } from '../redux/Service';
import { LikeAction } from '../types/LikeActions';
import CustomizePost from '../components/post/CustomizePost';
import { useAppSelector } from '../redux/Hook';
import CustomizeProfile from '../components/profile/CustomizeProfile';
import { useParams, useLocation } from 'react-router-dom';
import { getIdFromSlug } from '../utils/CommonUtls';
import { Student } from '../types/Student';
import { Business } from '../types/Business';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { COLOR_BLACK } from '../constants/Color';
import CustomizeSkeletonUserProfile from '../components/skeleton/CustomizeSkeletonUserProfile';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import { getGroupForPost } from '../utils/GetGroup';
import { AVATAR_CLICK, BACKGROUND_CLICK, CALL_ACTION, CHANGE_INFO_USER_CLICK_ACTION, CLICK_CAMERA_AVATAR_EVENT, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND } from '../constants/Variables'
import '../assets/css/profile.css'
import { followAPI } from '../api/CallAPI';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { useDispatch } from 'react-redux';
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen } from '../redux/Slice';
import { useTranslation } from 'react-multi-lang';
import { getFacultyTranslated } from '../utils/TranslateFaculty';
import { Faculty } from '../types/Faculty';
import { TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese';
import ModalUpdateStudent from '../components/update/updateProfile/ModalUpdateStudent';
import ModalUpdateFaculty from '../components/update/updateProfile/ModalUpdateFaculty';
import ModalUpdateBusiness from '../components/update/updateProfile/ModalUpdateBusiness';
import { CustomizeModalOption } from '../components/modal/CustomizeModalOption';
import { CustomizeModalShowImage } from '../components/modal/CustomizeModalShowImage';

export default function UserDetailsPage() {
  const [isFocused, setIsFocused] = useState(false);
  const t = useTranslation();
  const dispatch = useDispatch();
  const [modalShowOption, setModalShowOption] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowImage, setModalShowImage] = React.useState<boolean>(false);
  const [imageShow, setImageShow] = React.useState<string>('anh1');
  const { slug } = useParams()
  const userId = getIdFromSlug(slug ?? '')
  const location = useLocation();
  const { group } = location.state || {};
  const [post, setPost] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>();
  const [typeAuthorPost, setTypeAuthorPost] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const { data, isFetching } = useGetPostsByIdQuery(
    {
      userId: userId ?? 0,
      groupCode: group,
      userLogin: userLogin?.id ?? 0
    },
    {
      pollingInterval: 500
    }
  );

  useEffect(() => {
    if (data) {
      setIsLoading(false)
      setTypeAuthorPost(data.data.user['roleCodes']);
      setUserInfo(data.data.user);
      setPost(data.data.posts);
      setIsFollow(data.data.isFollow);
    }
  }, [data]);

  useEffect(() => {
    reloadingPageEvent();
  }, [userId])

  const handleUnSave = (post_id: number) => {
  }

  const likeAction = (obj: LikeAction) => {
  }

  useEffect(() => {
    setIsFocused(true);
    dispatch(setCurrentScreenNowIsProfileScreen(true));
    dispatch(goToProfileScreen(userId ?? -1))
    return () => {
      setIsFocused(false);
      dispatch(setCurrentScreenNowIsProfileScreen(false));
      dispatch(goToProfileScreen(-1))
    };
  }, []);

  const renderItem = (item: any) => {
    return (
      <CustomizePost
        id={item.id}
        userId={item.user['id']}
        name={item.user['name']}
        avatar={item.user['image']}
        typeAuthor={(userInfo?.roleCodes !== "" && userInfo?.roleCodes.includes(TYPE_POST_FACULTY)) ? TYPE_POST_FACULTY : TYPE_POST_BUSINESS}
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
        active={item.active}
      />
    )
  }

  const handleClickButtonEvent = (flag: number) => {
    if (flag === MESSENGER_ACTION) {
      alert('chat');
    } else if (flag === FOLLOW_ACTION) {
      handleClickFollowEvent();
    } else if (flag === CALL_ACTION) {
      alert('call');
    } else if (flag === CHANGE_INFO_USER_CLICK_ACTION) {
      handleClickIntoButtonMenuChangeUserInfoEvent();
    } else if (flag === AVATAR_CLICK) {
      setImageShow(userInfo?.image ?? "")
      setModalShowImage(true);
    } else if (flag === BACKGROUND_CLICK) {
      setImageShow(userInfo?.background ?? "")
      setModalShowImage(true);
    } else {
      handleClickIntoButtonMenu3dotEvent();
    }
  }

  const handleClickFollowEvent = async () => {
    const followData = {
      "userFollowId": userId,
      "userId": userLogin?.id
    }
    const status = await followAPI(SERVER_ADDRESS + 'api/users/follow', followData);
    setIsFollow(!isFollow);
  }

  const handleClickIntoButtonMenu3dotEvent = () => {
    setModalShowOption(true)
  }

  const handleClickIntoButtonMenuChangeUserInfoEvent = () => {
    setModalShowUpdate(true)
  }

  const handleClickIntoHeaderComponentEvent = (flag: number) => {
    switch (flag) {
      case CLICK_CAMERA_AVATAR_EVENT:
        console.log('CLICK_CAMERA_AVATAR_EVENT');
        break;
      case CLICK_CAMERA_BACKGROUND_EVENT:
        console.log('CLICK_CAMERA_BACKGROUND_EVENT');
        break;
      case SEE_AVATAR:
        console.log('SEE_AVATAR');
        setImageShow(userInfo?.image ?? "")
        break;
      case SEE_BACKGROUND:
        console.log('SEE_BACKGROUND');
        setImageShow(userInfo?.background ?? "")
        break;
      default:
        break;
    }
  }

  const reloadingPageEvent = function () {
    window.scrollTo(0, 0);
  }

  const checkRole = () => {
    switch (userInfo?.roleCodes ?? '') {
      case TYPE_POST_STUDENT:
        return <ModalUpdateStudent
          t={t}
          show={modalShowUpdate}
          onHide={() => setModalShowUpdate(false)}
          user={userInfo}
          nameHadTranslated={getFacultyTranslated(userInfo?.name + "", t)}
        />
      case TYPE_POST_FACULTY:
        return <ModalUpdateFaculty
          t={t}
          show={modalShowUpdate}
          onHide={() => setModalShowUpdate(false)}
          user={userInfo}
          nameHadTranslated={getFacultyTranslated(userInfo?.name + "", t)}
        />
      case TYPE_POST_BUSINESS:
        return <ModalUpdateBusiness
          t={t}
          show={modalShowUpdate}
          onHide={() => setModalShowUpdate(false)}
          user={userInfo}
          nameHadTranslated={getFacultyTranslated(userInfo?.name + "", t)}
        />
      default:
        return null;
    }
  }

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='row feed-body'>
              {
                isLoading ?
                  <div className='card shadow-xss rounded-xxl mb-3 border-0 p-4 col-12'>
                    <CustomizeSkeletonUserProfile />
                    <div className='spaceSkletonUserProfile'></div>
                    <CustomizeSkeleton />
                  </div>
                  : <div className='col-12'>
                    <CustomizeProfile
                      t={t}
                      isFollow={isFollow}
                      isSameUser={userLogin?.id === userId}
                      data={post ? post : []}
                      role={typeAuthorPost}
                      userData={userInfo}
                      handleClickButtonEvent={handleClickButtonEvent}
                      handleClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent} />
                    {
                      Boolean(group) && <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4'>
                        <div className='snippet mt-2 wrapperTitleUserProfile' data-title='.dot-typing'>
                          <span className='txtTitleInUserProfile'>
                            {getFacultyTranslated(userInfo?.name + "", t)}{' '}
                            <FontAwesomeIcon className='iconArrowToRightUserProfile' icon={faPlay} size='1x' color={COLOR_BLACK} />
                            {' '}{getGroupForPost(group, t)}
                          </span>
                        </div>
                      </div>
                    }

                    {
                      (Boolean(post) && post?.length !== 0) && post.map((item, index) => {
                        return renderItem(item)
                      })
                    }
                  </div>
              }

            </div>
          </div>
        </div>
      </div>
      <CustomizeModalOption
        show={modalShowOption}
        onHide={() => setModalShowOption(false)}
      />
      <CustomizeModalShowImage
        name={userInfo?.name ?? ""}
        image={imageShow}
        show={modalShowImage}
        onHide={() => { setModalShowImage(false) }}
      />
      {
        checkRole()
      }
    </>
  )
}