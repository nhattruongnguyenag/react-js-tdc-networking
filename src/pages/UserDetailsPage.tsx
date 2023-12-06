import React, { JSXElementConstructor, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { numberDayPassed } from '../utils/FormatTime';
import Header from '../components/common/Header';
import { useGetPostsByIdQuery } from '../redux/Service';
import { LikeAction } from '../types/LikeActions';
import CustomizePost from '../components/post/CustomizePost';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import CustomizeProfile from '../components/profile/CustomizeProfile';
import { useParams, useLocation } from 'react-router-dom';
import { getIdFromSlug } from '../utils/CommonUtls';
import { Student } from '../types/Student';
import { Business } from '../types/Business';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faUser } from '@fortawesome/free-solid-svg-icons'
import { COLOR_BLACK } from '../constants/Color';
import CustomizeSkeletonUserProfile from '../components/skeleton/CustomizeSkeletonUserProfile';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import { getGroupForPost } from '../utils/GetGroup';
import { CALL_ACTION, CHANGE_INFO_USER_CLICK_ACTION, CLICK_CAMERA_AVATAR_EVENT, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND, TYPE_SURVEY_POST } from '../constants/Variables'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../components/example/TabSelector";
import FollowListView from '../components/listviews/FollowListView';
import FollowerListView from '../components/listviews/FollowerListView';
import '../assets/css/profile.css'
import { followAPI } from '../api/CallAPI';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { toast } from 'react-toastify';
import TextValidate from '../components/TextValidate';
import { handleUploadImage } from '../utils/UploadUtils';
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange, isPhone, isTime, isType } from '../utils/ValidateUtils';
import axios, { AxiosResponse } from 'axios';
import { Token } from '../types/Token'
import { Data } from '../types/Data'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../constants/KeyValue';
import { useDispatch } from 'react-redux';
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen, setUserLogin } from '../redux/Slice';
import vi from '../translates/vi.json';
import en from '../translates/en.json';
import jp from '../translates/jp.json';
import { setTranslations, useTranslation } from 'react-multi-lang';
import { getFacultyTranslated } from '../utils/TranslateFaculty';
import { Faculty } from '../types/Faculty';
import DefaultAvatar from '../components/common/DefaultAvatar';
setTranslations({ vi, en, jp })

import PostSavedListView from '../components/listviews/PostSavedListView';
import { TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese';

export default function UserDetailsPage() {
  const [isFocused, setIsFocused] = useState(false);
  const t = useTranslation();
  const dispatch = useDispatch();
  const [modalShowOption, setModalShowOption] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const { slug } = useParams()
  const userId = getIdFromSlug(slug ?? '')
  const location = useLocation();
  const { group } = location.state || {};
  const [post, setPost] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<Student | Faculty | Business | null>();
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
        break;
      case SEE_BACKGROUND:
        console.log('SEE_BACKGROUND');
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
                  <div className='card shadow-xss rounded-xxl mb-3 border-0 p-4 col-10'>
                    <CustomizeSkeletonUserProfile />
                    <div className='spaceSkletonUserProfile'></div>
                    <CustomizeSkeleton />
                  </div>
                  : <div className='col-10'>
                    <CustomizeProfile
                      t={t}
                      isFollow={isFollow}
                      isSameUser={userLogin?.id === userId}
                      data={post}
                      role={typeAuthorPost}
                      userData={userInfo}
                      handleClickButtonEvent={handleClickButtonEvent}
                      handleClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent} />
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4'>
                      <div className='snippet mt-2 wrapperTitleUserProfile' data-title='.dot-typing'>
                        <span className='txtTitleInUserProfile'>
                          {getFacultyTranslated(userInfo?.name + "", t)}{' '}
                          <FontAwesomeIcon className='iconArrowToRightUserProfile' icon={faPlay} size='1x' color={COLOR_BLACK} />
                          {' '}{getGroupForPost(group, t)}
                        </span>
                      </div>
                    </div>
                    {
                      post.length !== 0 && post.map((item, index) => {
                        return renderItem(item)
                      })
                    }
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
      <ModalOptions
        show={modalShowOption}
        onHide={() => setModalShowOption(false)}
      />
      {
        checkRole()
      }
    </>
  )
}



interface ModalType {
  show: boolean
  onHide: () => void,
}

function ModalOptions(props: Readonly<ModalType>) {
  const { slug } = useParams()
  const userId = getIdFromSlug(slug ?? '')
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [selectedTab, setSelectedTab] = useTabs([
    "following",
    "follower",
    "saved",
  ]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Menu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>
          <div >
            <nav className="flex border-b border-gray-300">

              {
                userId == userLogin?.id ? <>
                  <TabSelector
                    isActive={selectedTab === "following"}
                    onClick={() => setSelectedTab("following")}
                  >
                    Đang theo dõi
                  </TabSelector>
                  <TabSelector
                    isActive={selectedTab === "follower"}
                    onClick={() => setSelectedTab("follower")}
                  >
                    Đang theo dõi bạn
                  </TabSelector>
                  <TabSelector
                    isActive={selectedTab === "saved"}
                    onClick={() => setSelectedTab("saved")}
                  >
                    Bài viết đã lưu
                  </TabSelector>
                </> : <>
                  <TabSelector
                    isActive={selectedTab === "following"}
                    onClick={() => setSelectedTab("following")}
                  >
                    Đang theo dõi
                  </TabSelector>
                </>
              }

            </nav>
            <div className="p-2">
              <TabPanel hidden={selectedTab !== "following"}><FollowListView id={userId} /></TabPanel>
              <TabPanel hidden={selectedTab !== "follower"}><FollowerListView id={userId} /></TabPanel>
              <TabPanel hidden={selectedTab !== "saved"}><PostSavedListView /></TabPanel>
            </div>
          </div>

        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='btn btn-outline-secondary bg-primary'>Close</Button>
      </Modal.Footer>
    </Modal>

  );
}


interface ModalTypeUpdate {
  t: ReturnType<typeof useTranslation>
  show: boolean
  onHide: () => void,
  user: any,
  nameHadTranslated: string
}


interface FacultyUpdate {
  name: InputTextValidate
  phone: InputTextValidate
  email: InputTextValidate
}

const isAllFieldsValidFaculty = (validate: FacultyUpdate): boolean => {
  let key: keyof FacultyUpdate
  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }
  return true
}


function ModalUpdateFaculty(props: Readonly<ModalTypeUpdate>) {
  const dispatch = useAppDispatch()
  const { slug } = useParams();
  const [isPassesValidate, setPassedValidate] = useState(true);
  const userId = getIdFromSlug(slug ?? '');
  const [faculty, setFaculty] = useState({
    id: userId,
    name: '',
    email: '',
    image: '',
    background: '',
    phone: '',
  });

  const [imageAvatar, setImageAvatar] = useState('');
  const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
  const [imageBackground, setImageBackground] = useState('');
  const [imageBackgroundTemporary, setImageBackgroundTemporary] = useState('');
  const [avatarHadSave, setAvatarHadSave] = useState(false);
  const [backgroundHadSave, setBackgroundHadSave] = useState(false);
  // Faculty
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const fileInputRefAvatar = useRef<HTMLInputElement | null>(null);
  const fileInputRefBackground = useRef<HTMLInputElement | null>(null);
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null);

  const [validate, setValidate] = useState<FacultyUpdate>({
    name: {
      textError: props.t("Validate.validateNameNull"),
      isVisible: false,
      isError: true,
    },
    phone: {
      textError: props.t("Validate.validatePhoneNull"),
      isVisible: false,
      isError: true,
    },
    email: {
      textError: props.t("Validate.validatePhoneNull"),
      isVisible: false,
      isError: false,
    },
  });

  useEffect(() => {
    setFaculty({
      id: userId,
      name: props.user?.name ?? '',
      email: props.user?.email ?? '',
      image: props.user?.image ?? '',
      background: props.user?.background ?? '',
      phone: props.user?.phone ?? '',
    });
    // Faculty
    setPhone(props.user?.phone ?? "");
    setName(props.user?.name ?? "");
    props.user?.image ? setImageAvatarTemporary(SERVER_ADDRESS + 'api/images/' + props.user?.image) : setImageAvatarTemporary("");
    props.user?.background ? setImageBackgroundTemporary(SERVER_ADDRESS + "api/images/" + props.user?.background) : setImageBackgroundTemporary("");
  }, [props.user]);

  const handleGetFilesAvatar = () => {
    if (fileInputRefAvatar.current) {
      fileInputRefAvatar.current.showPicker();
      fileInputRefAvatar.current.value = '';
    }
  };

  const handleGetFilesBackground = () => {
    if (fileInputRefBackground.current) {
      fileInputRefBackground.current.showPicker();
      fileInputRefBackground.current.value = '';
    }
  };

  const onSelectUploadImageAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setAvatarHadSave(true)
      setImageAvatar(URL.createObjectURL(event.target.files[0]));
      handleUploadImage(event.target.files, (response) => {
        setFaculty({ ...faculty, image: response.data[0] });
        setAvatarHadSave(false)
      });
    }
  };

  const onSelectUploadImageBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setBackgroundHadSave(true);
      setImageBackground(URL.createObjectURL(event.target.files[0]));
      handleUploadImage(event.target.files, (response) => {
        setFaculty({ ...faculty, background: response.data[0] });
        setBackgroundHadSave(false);
      });
    }
  };

  const handlePhoneChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setPhone(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: true,
              textError: props.t("Validate.validatePhoneNull"),
              isVisible: true
            }
          }));
          resolve();
        } else if (!isPhone(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: true,
              textError: props.t("Validate.validatePhoneUnCorrectFormat"),
              isVisible: true
            }
          }));
          resolve();
        } else {
          setFaculty((prevFaculty) => ({
            ...prevFaculty,
            phone: event
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: false,
              isVisible: false
            }
          }));
          resolve();
        }
      });
    },
    [validate]
  );


  const handleNameChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setName(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameNull"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (isContainSpecialCharacter(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameSpecialCharacter"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (!isLengthInRange(event, 1, 255)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameMaxLength"),
              isVisible: true,
            },
          }));
          resolve();
        } else {
          setFaculty((prevFaculty) => ({
            ...prevFaculty,
            name: event,
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: false,
              isVisible: false,
            },
          }));
          resolve();
        }
      });
    },
    [validate]
  );


  const asyncForValidate = async () => {
    const validationPromises = [
      handlePhoneChange(phone),
      handleNameChange(name),
    ];
    await Promise.all(validationPromises);
  }

  useEffect(() => {
    if (isAllFieldsValidFaculty(validate)) {
      axios
        .post<Faculty, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/faculty', faculty)
        .then((responseUpdate: any) => {
          const token = responseUpdate.data.data.token;
          axios
            .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
                sessionStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data));
                dispatch(setUserLogin(response.data.data))
                toast.success(props.t("Toast.toastUpdateProfileUnSuccess"));
                props.onHide();
              } else {
                toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
              }
            })
            .catch((error) => {
              toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
            });
        })
        .catch((error) => {
          toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
        });
    } else {
      let key: keyof FacultyUpdate;
      for (key in validate) {
        if (validate[key].isError) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            [key]: {
              ...prevValidate[key],
              isVisible: true,
            },
          }));
        }
      }
    }
  }, [isPassesValidate])

  const handleSubmitEvent = async () => {
    asyncForValidate();
    setPassedValidate(!isPassesValidate);
  };

  const printBackground = useMemo(() => {
    let image;
    if (imageBackground.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageBackground} style={{ width: '100%', height: 300 }} />
        </div>
      );
    } else if (imageBackgroundTemporary.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageBackgroundTemporary} style={{ width: '100%', height: 300, borderRadius: 10 }} />
        </div>
      );
    } else {
      image = (
        <div className='img'>
          <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={'/assets/images/background-default.jpg'} style={{ width: '100%', height: 300, borderRadius: 10 }} />
        </div>
      );
    }
    return image;
  }, [imageBackground, imageBackgroundTemporary, backgroundHadSave]);

  const printAvatar = useMemo(() => {
    let image;
    if (imageAvatar.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={avatarHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageAvatar} style={{ width: 200, height: 200, borderRadius: 100 }} />
        </div>
      );
    } else if (imageAvatarTemporary.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={avatarHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageAvatarTemporary} style={{ width: 200, height: 200, borderRadius: 100 }} />
        </div>
      );
    } else {
      image = (
        <div className='img'>
          <DefaultAvatar name={props.nameHadTranslated} size={300} styleBootstrap={undefined} />
        </div>
      );
    }
    return image;
  }, [imageAvatar, imageAvatarTemporary, avatarHadSave]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.t("ModalUpdate.modalUpdateTitle")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-mobile text-grey-500 pe-0'> </i>
          <input
            id='phoneNumber'
            value={phone}
            type='text'
            onChange={(e) => handlePhoneChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("ModalUpdate.modalUpdatePlaceholderPhoneNumber")}
            style={{ borderColor: !validate.phone?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.phone?.textError}
            isError={validate.phone?.isError}
            isVisible={validate.phone?.isVisible}
          />
        </div>
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-user text-grey-500 pe-0'></i>
          <input
            id='name'
            value={name}
            type='text'
            onChange={(e) => handleNameChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("Validate.validateNameNull")}
            style={{ borderColor: !validate.name?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.name?.textError}
            isError={validate.name?.isError}
            isVisible={validate.name?.isVisible}
          />
        </div>
        <div className='form-group icon-input' style={{ marginTop: 10, marginBottom: 40 }}>
          <div className='d-flex mt-3 p-0'>
            <input
              type={'file'}
              multiple
              ref={fileInputRefAvatar}
              className='hidden'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageAvatar(event)}
            />
            <button
              type='button'
              className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
              onClick={handleGetFilesAvatar}
              ref={buttonCallPickerImgRef}
            >
              <i className='font-md text-success feather-image me-2'></i>
              <span className='d-none-xs'>{props.t("ModalUpdate.modalUpdateAvatar")}</span>
            </button>
          </div>
          {
            avatarHadSave ?
              (<span style={{ background: 'red', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>
                {props.t("ModalUpdate.modalUpdateImageNotifyNotUpload")}</span>) : (<span style={{ background: 'green', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>{props.t("ModalUpdate.modalUpdateImageNotifyUploadSuccess")}</span>)
          }
          {printAvatar}
        </div>
        <div className='form-group icon-input mb-3 mt-3'>
          <div className='d-flex mt-3 p-0'>
            <input
              type={'file'}
              multiple
              ref={fileInputRefBackground}
              className='hidden'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageBackground(event)}
            />
            <button
              type='button'
              className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
              onClick={handleGetFilesBackground}
              ref={buttonCallPickerImgRef}
            >
              <i className='font-md text-success feather-image me-2'></i>
              <span className='d-none-xs'>{props.t("ModalUpdate.modalUpdateBackground")}</span>
            </button>
          </div>
          {
            backgroundHadSave ?
              (<span style={{ background: 'red', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>
                {props.t("ModalUpdate.modalUpdateImageNotifyNotUpload")}</span>) : (<span style={{ background: 'green', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>{props.t("ModalUpdate.modalUpdateImageNotifyUploadSuccess")}</span>)
          }
          {printBackground}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!(backgroundHadSave === false && avatarHadSave === false)}
          onClick={() => handleSubmitEvent()} className='btn btn-outline-secondary bg-primary'>{props.t("ModalUpdate.modalUpdateButtonText")}</Button>
      </Modal.Footer>
    </Modal>
  );
}

interface BusinessUpdate {
  name: InputTextValidate
  phone: InputTextValidate
  representor: InputTextValidate
  taxCode: InputTextValidate
  address: InputTextValidate
  activeTime: InputTextValidate
  email: InputTextValidate
}


const isAllFieldsValidBusiness = (validate: BusinessUpdate): boolean => {
  let key: keyof BusinessUpdate
  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }
  return true
}


function ModalUpdateBusiness(props: Readonly<ModalTypeUpdate>) {
  const dispatch = useAppDispatch()
  const { slug } = useParams();
  const userId = getIdFromSlug(slug ?? '');
  const [business, setBusiness] = useState({
    id: userId,
    email: '',
    name: '',
    image: '',
    background: '',
    representor: '',
    taxCode: '',
    address: '',
    activeTime: '',
    phone: ''
  });

  const [imageAvatar, setImageAvatar] = useState('');
  const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
  const [imageBackground, setImageBackground] = useState('');
  const [imageBackgroundTemporary, setImageBackgroundTemporary] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [representor, setRepresentor] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [address, setAddress] = useState('');
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [isValidatePassed, setValidatePassed] = useState(false);
  const [avatarHadSave, setAvatarHadSave] = useState(false);
  const [backgroundHadSave, setBackgroundHadSave] = useState(false);

  const fileInputRefAvatar = useRef<HTMLInputElement | null>(null);
  const fileInputRefBackground = useRef<HTMLInputElement | null>(null);
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null);

  const [validate, setValidate] = useState<BusinessUpdate>({
    name: {
      textError: props.t("Validate.validateNameNull"),
      isVisible: false,
      isError: true
    },
    representor: {
      textError: props.t("Validate.validatePresentorNull"),
      isVisible: false,
      isError: true
    },
    taxCode: {
      textError: props.t("Validate.validateTaxCodeNull"),
      isVisible: false,
      isError: true
    },
    address: {
      textError: props.t("Validate.validateAddressNull"),
      isVisible: false,
      isError: true
    },
    activeTime: {
      textError: props.t("Validate.validateTimeActiveErrorFormat"),
      isVisible: false,
      isError: true
    },
    phone: {
      textError: props.t("Validate.validatePhoneNull"),
      isVisible: false,
      isError: true
    },
    email: {
      textError: props.t("Validate.validateEmailNull"),
      isVisible: false,
      isError: false
    }
  });

  useEffect(() => {
    setBusiness({
      id: userId,
      email: props.user?.email ?? '',
      name: props.user?.name ?? '',
      image: props.user?.image ?? '',
      background: props.user?.background ?? '',
      representor: props.user?.representor ?? '',
      taxCode: props.user?.taxCode ?? '',
      address: props.user?.address ?? '',
      activeTime: props.user?.activeTime ?? '',
      phone: props.user?.phone ?? '',
    })
    setTimeStart(props.user?.activeTime.split("-")[0].trim());
    setTimeEnd(props.user?.activeTime.split("-")[1].trim());
    setPhone(props.user?.phone ?? "");
    setEmail(props.user?.email ?? "");
    setName(props.user?.name ?? "");
    setRepresentor(props.user?.representor ?? "");
    setTaxCode(props.user?.taxCode ?? "");
    setAddress(props.user?.address ?? "");
    props.user?.image ? setImageAvatarTemporary(SERVER_ADDRESS + 'api/images/' + props.user?.image) : setImageAvatarTemporary("");
    props.user?.background ? setImageBackgroundTemporary(SERVER_ADDRESS + "api/images/" + props.user?.background) : setImageBackgroundTemporary("");
  }, [props.user]);

  const handleGetFilesAvatar = () => {
    if (fileInputRefAvatar.current) {
      fileInputRefAvatar.current.showPicker();
      fileInputRefAvatar.current.value = '';
    }
  };

  const handleGetFilesBackground = () => {
    if (fileInputRefBackground.current) {
      fileInputRefBackground.current.showPicker();
      fileInputRefBackground.current.value = '';
    }
  };

  const onSelectUploadImageAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setAvatarHadSave(true);
      setImageAvatar(URL.createObjectURL(event.target.files[0]));
      handleUploadImage(event.target.files, (response) => {
        setBusiness({ ...business, image: response.data[0] });
        setAvatarHadSave(false);
      });
    }
  };

  const onSelectUploadImageBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setBackgroundHadSave(true);
      setImageBackground(URL.createObjectURL(event.target.files[0]));
      handleUploadImage(event.target.files, (response) => {
        setBusiness({ ...business, background: response.data[0] });
        setBackgroundHadSave(false);
      });
    }
  };

  const handlePhoneChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setPhone(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: true,
              textError: props.t("Validate.validatePhoneNull"),
              isVisible: true
            }
          }));
          resolve();
        } else if (!isPhone(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: true,
              textError: props.t("Validate.validatePhoneUnCorrectFormat"),
              isVisible: true
            }
          }));
          resolve();
        } else {
          setBusiness((prevBusiness) => ({
            ...prevBusiness,
            phone: event
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: false,
              isVisible: false
            }
          }));
          resolve();
        }
      });
    },
    [validate]
  );

  const handleNameChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setName(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameNull"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (isContainSpecialCharacter(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameSpecialCharacter"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (!isLengthInRange(event, 1, 255)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameMaxLength"),
              isVisible: true,
            },
          }));
          resolve();
        } else {
          setBusiness((prevBusiness) => ({
            ...prevBusiness,
            name: event,
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: false,
              isVisible: false,
            },
          }));
          resolve();
        }
      });
    },
    [validate]
  );

  const handleRepresentoreChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setRepresentor(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            representor: {
              ...prevValidate.representor,
              isError: true,
              textError: props.t("Validate.validatePresentorNull"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (isContainSpecialCharacter(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            representor: {
              ...prevValidate.representor,
              isError: true,
              textError: props.t("Validate.validateRepresentorSpecialCharacter"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (!isLengthInRange(event, 1, 255)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            representor: {
              ...prevValidate.representor,
              isError: true,
              textError: props.t("Validate.validateRepresentorMaxLength"),
              isVisible: true,
            },
          }));
          resolve();
        } else {
          setBusiness((prevBusiness) => ({
            ...prevBusiness,
            representor: event,
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            representor: {
              ...prevValidate.representor,
              isError: false,
              isVisible: false,
            },
          }));
          resolve();
        }
      });
    },
    [validate]
  );

  const handleTaxCodeChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setTaxCode(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            taxCode: {
              ...prevValidate.taxCode,
              isError: true,
              textError: props.t("Validate.validateTaxCodeNull"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (!isLengthInRange(event, 1, 255)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            taxCode: {
              ...prevValidate.taxCode,
              isError: true,
              textError: props.t("Validate.validateTaxCodeMaxLength"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (!isType(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            taxCode: {
              ...prevValidate.taxCode,
              isError: true,
              textError: props.t("Validate.validateTaxCodeFormat"),
              isVisible: true,
            },
          }));
          resolve();
        } else {
          setBusiness((prevBusiness) => ({
            ...prevBusiness,
            taxCode: event,
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            taxCode: {
              ...prevValidate.taxCode,
              isError: false,
              isVisible: false,
            },
          }));
          resolve();
        }
      });
    },
    [validate]
  );

  const handleAddressChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setAddress(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            address: {
              ...prevValidate.address,
              isError: true,
              textError: props.t("Validate.validateAddressNull"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (!isLengthInRange(event, 1, 255)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            address: {
              ...prevValidate.address,
              isError: true,
              textError: props.t("Validate.validateAddressMaxLength"),
              isVisible: true,
            },
          }));
          resolve();
        } else {
          setBusiness((prevBusiness) => ({
            ...prevBusiness,
            address: event,
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            address: {
              ...prevValidate.address,
              isError: false,
              isVisible: false,
            },
          }));
          resolve();
        }
      });
    },
    [validate]
  );


  useEffect(() => {
    if (isAllFieldsValidBusiness(validate)) {
      axios
        .post<Faculty, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/business', business)
        .then((responseUpdate: any) => {
          const token = responseUpdate.data.data.token;
          axios
            .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
                sessionStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data));
                dispatch(setUserLogin(response.data.data))
                toast.success(props.t("Toast.toastUpdateProfileSuccess"));
                props.onHide();
              } else {
                toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
              }
            })
            .catch((error) => {
              toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
            });
        })
        .catch((error) => {
          toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
        });
    } else {
      let key: keyof BusinessUpdate;
      for (key in validate) {
        if (validate[key].isError) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            [key]: {
              ...prevValidate[key],
              isVisible: true,
            },
          }));
        }
      }
    }
  }, [isValidatePassed])

  useEffect(() => {
    if (!isTime(timeStart, timeEnd)) {
      setValidate({
        ...validate,
        activeTime: {
          ...validate.activeTime,
          isError: true,
          textError: props.t("Validate.validateTimeActiveErrorFormat"),
          isVisible: true
        }
      })
    } else {
      setBusiness({ ...business, activeTime: timeStart + ' - ' + timeEnd })
      setValidate({
        ...validate,
        activeTime: {
          ...validate.activeTime,
          isError: false,
          isVisible: false
        }
      })
    }
  }, [timeStart, timeEnd])

  const asyncForValidate = async () => {
    const validationPromises = [
      await handlePhoneChange(phone),
      await handleAddressChange(address),
      await handleTaxCodeChange(taxCode),
      await handleRepresentoreChange(representor),
      await handleNameChange(name),
    ];
    await Promise.all(validationPromises);
  }

  const handleSubmitEvent = async () => {
    await asyncForValidate();
    setValidatePassed(!isValidatePassed);
  };

  const printBackground = useMemo(() => {
    let image;
    if (imageBackground.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageBackground} style={{ width: '100%', height: 300 }} />
        </div>
      );
    } else if (imageBackgroundTemporary.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageBackgroundTemporary} style={{ width: '100%', height: 300, borderRadius: 10 }} />
        </div>
      );
    } else {
      image = (
        <div className='img'>
          <img className='imageUpdate' src={'/assets/images/background-default.jpg'} style={{ width: '100%', height: 300, borderRadius: 10 }} />
        </div>
      );
    }
    return image;
  }, [imageBackground, imageBackgroundTemporary, backgroundHadSave]);

  const printAvatar = useMemo(() => {
    let image;
    if (imageAvatar.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={avatarHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageAvatar} style={{ width: 200, height: 200, borderRadius: 100 }} />
        </div>
      );
    } else if (imageAvatarTemporary.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={avatarHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageAvatarTemporary} style={{ width: 200, height: 200, borderRadius: 100 }} />
        </div>
      );
    } else {
      image = (
        <div className='img'>
          <DefaultAvatar name={props.nameHadTranslated} size={300} styleBootstrap={undefined} />
        </div>
      );
    }
    return image;
  }, [imageAvatar, imageAvatarTemporary, avatarHadSave]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.t("ModalUpdate.modalUpdateTitle")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* name */}
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-name text-grey-500 pe-0'> </i>
          <input
            value={name}
            type='text'
            onChange={(e) => handleNameChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("ModalUpdate.modalUpdateCompanyName")}
            style={{ borderColor: !validate.name?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.name?.textError}
            isError={validate.name?.isError}
            isVisible={validate.name?.isVisible}
          />
        </div>
        {/* activeTime */}
        <div className='form-group icon-input mb-3'>
          <div className='clock'>
            <input
              type='time'
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
              style={{ borderColor: !validate.activeTime?.isError ? '#228b22' : '#eee' }}
              className='style2-input form-control text-grey-900 font-xsss fw-600 ps-4'
            />
            <label className='me-1 ms-1'>{props.t("Profile.profileActiveTimeTo")}</label>
            <input
              type='time'
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
              style={{ borderColor: !validate.activeTime?.isError ? '#228b22' : '#eee' }}
              className='style2-input form-control text-grey-900 font-xsss fw-600 ps-4'
            />
          </div>
          <TextValidate
            textError={validate.activeTime?.textError}
            isError={validate.activeTime?.isError}
            isVisible={validate.activeTime?.isVisible}
          />
        </div>
        {/* address */}
        <div className='form-group icon-input mb-3'>
          <i className='font-sm fas fa-map-marker-alt text-grey-500 pe-0'></i>
          <input
            id='name'
            value={address}
            type='text'
            onChange={(e) => handleAddressChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("ModalUpdate.modalUpdateCompanyAddress")}
            style={{ borderColor: !validate.address?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.address?.textError}
            isError={validate.address?.isError}
            isVisible={validate.address?.isVisible}
          />
        </div>
        {/* taxCode */}
        <div className='form-group icon-input mb-3'>
          <i className='font-sm fas fa-file-invoice-dollar text-grey-500 pe-0'></i>
          <input
            id='name'
            value={taxCode}
            type='text'
            onChange={(e) => handleTaxCodeChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("ModalUpdate.modalUpdateCompanyTaxCode")}
            style={{ borderColor: !validate.taxCode?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.taxCode?.textError}
            isError={validate.taxCode?.isError}
            isVisible={validate.taxCode?.isVisible}
          />
        </div>
        {/* representor */}
        <div className='form-group icon-input mb-3'>
          <i className='font-sm fas fa-user text-grey-500 pe-0'></i>
          <input
            id='name'
            value={representor}
            type='text'
            onChange={(e) => handleRepresentoreChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("ModalUpdate.modalUpdateCompanyPresentor")}
            style={{ borderColor: !validate.representor?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.representor?.textError}
            isError={validate.representor?.isError}
            isVisible={validate.representor?.isVisible}
          />
        </div>
        {/* Phone */}
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-mobile text-grey-500 pe-0'> </i>
          <input
            id='phoneNumber'
            value={phone}
            type='text'
            onChange={(e) => handlePhoneChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("ModalUpdate.modalUpdatePlaceholderPhoneNumber")}
            style={{ borderColor: !validate.phone?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.phone?.textError}
            isError={validate.phone?.isError}
            isVisible={validate.phone?.isVisible}
          />
        </div>
        {/* Avatar */}
        <div className='form-group icon-input' style={{ marginTop: 10, marginBottom: 40 }}>
          <div className='d-flex mt-3 p-0'>
            <input
              type={'file'}
              multiple
              ref={fileInputRefAvatar}
              className='hidden'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageAvatar(event)}
            />
            <button
              type='button'
              className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
              onClick={handleGetFilesAvatar}
              ref={buttonCallPickerImgRef}
            >
              <i className='font-md text-success feather-image me-2'></i>
              <span className='d-none-xs'>{props.t("ModalUpdate.modalUpdateAvatar")}</span>
            </button>
          </div>
          {
            avatarHadSave ?
              (<span style={{ background: 'red', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>
                {props.t("ModalUpdate.modalUpdateImageNotifyNotUpload")}</span>) : (<span style={{ background: 'green', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>{props.t("ModalUpdate.modalUpdateImageNotifyUploadSuccess")}</span>)
          }
          {printAvatar}
        </div>
        {/* Background */}
        <div className='form-group icon-input mb-3 mt-3'>
          <div className='d-flex mt-3 p-0'>
            <input
              type={'file'}
              multiple
              ref={fileInputRefBackground}
              className='hidden'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageBackground(event)}
            />
            <button
              type='button'
              className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
              onClick={handleGetFilesBackground}
              ref={buttonCallPickerImgRef}
            >
              <i className='font-md text-success feather-image me-2'></i>
              <span className='d-none-xs'>{props.t("ModalUpdate.modalUpdateBackground")}</span>
            </button>
          </div>
          {
            backgroundHadSave ?
              (<span style={{ background: 'red', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>
                {props.t("ModalUpdate.modalUpdateImageNotifyNotUpload")}</span>) : (<span style={{ background: 'green', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>{props.t("ModalUpdate.modalUpdateImageNotifyUploadSuccess")}</span>)
          }
          {printBackground}

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!(backgroundHadSave === false && avatarHadSave === false)}
          onClick={() => handleSubmitEvent()} className='btn btn-outline-secondary bg-primary'>
          {props.t("ModalUpdate.modalUpdateButtonText")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface StudentUpdate {
  name: InputTextValidate
  phone: InputTextValidate
  email: InputTextValidate
}

const isAllFieldsValidStudent = (validate: StudentUpdate): boolean => {
  let key: keyof StudentUpdate
  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }
  return true
}

function ModalUpdateStudent(props: Readonly<ModalTypeUpdate>) {
  const dispatch = useAppDispatch()
  const { slug } = useParams();
  const userId = getIdFromSlug(slug ?? '');
  const [student, setStudent] = useState({
    id: userId,
    email: '',
    name: '',
    image: '',
    background: '',
    phone: '',
    studentCode: ''
  });

  const [imageAvatar, setImageAvatar] = useState('');
  const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
  const [imageBackground, setImageBackground] = useState('');
  const [imageBackgroundTemporary, setImageBackgroundTemporary] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isValidatePassed, setValidatePassed] = useState(false);
  const fileInputRefAvatar = useRef<HTMLInputElement | null>(null);
  const fileInputRefBackground = useRef<HTMLInputElement | null>(null);
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null);
  const [avatarHadSave, setAvatarHadSave] = useState(false);
  const [backgroundHadSave, setBackgroundHadSave] = useState(false);

  const [validate, setValidate] = useState<StudentUpdate>({
    name: {
      textError: props.t("Validate.validateNameNull"),
      isVisible: false,
      isError: true,
    },
    phone: {
      textError: props.t("Validate.validatePhoneNull"),
      isVisible: false,
      isError: true,
    },
    email: {
      textError: props.t("Validate.validatePhoneNull"),
      isVisible: false,
      isError: false,
    },
  });

  useEffect(() => {
    setStudent({
      id: userId,
      email: props.user?.email ?? '',
      name: props.user?.name ?? '',
      image: props.user?.image ?? '',
      background: props.user?.background ?? '',
      phone: props.user?.phone ?? '',
      studentCode: props.user?.studentCode ?? '',
    })
    setPhone(props.user?.phone ?? "");
    setName(props.user?.name ?? "");
    props.user?.image ? setImageAvatarTemporary(SERVER_ADDRESS + 'api/images/' + props.user?.image) : setImageAvatarTemporary("");
    props.user?.background ? setImageBackgroundTemporary(SERVER_ADDRESS + "api/images/" + props.user?.background) : setImageBackgroundTemporary("");
  }, [props.user]);

  const handleGetFilesAvatar = () => {
    if (fileInputRefAvatar.current) {
      fileInputRefAvatar.current.showPicker();
      fileInputRefAvatar.current.value = '';
    }
  };

  const handleGetFilesBackground = () => {
    if (fileInputRefBackground.current) {
      fileInputRefBackground.current.showPicker();
      fileInputRefBackground.current.value = '';
    }
  };

  const onSelectUploadImageAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setAvatarHadSave(true)
      setImageAvatar(URL.createObjectURL(event.target.files[0]));
      handleUploadImage(event.target.files, (response) => {
        setStudent({ ...student, image: response.data[0] });
        setAvatarHadSave(false);
      });
    }
  };

  const onSelectUploadImageBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setBackgroundHadSave(true);
      setImageBackground(URL.createObjectURL(event.target.files[0]));
      handleUploadImage(event.target.files, (response) => {
        setStudent({ ...student, background: response.data[0] });
        setBackgroundHadSave(false);
      });
    }
  };

  const handlePhoneChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setPhone(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: true,
              textError: props.t("Validate.validatePhoneNull"),
              isVisible: true
            }
          }));
          resolve();
        } else if (!isPhone(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: true,
              textError: props.t("Validate.validatePhoneUnCorrectFormat"),
              isVisible: true
            }
          }));
          resolve();
        } else {
          setStudent((preyStudent) => ({
            ...preyStudent,
            phone: event
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            phone: {
              ...prevValidate.phone,
              isError: false,
              isVisible: false
            }
          }));
          resolve();
        }
      });
    },
    [validate]
  );

  const handleNameChange = useCallback(
    (event: string) => {
      return new Promise<void>((resolve) => {
        setName(event);
        if (isBlank(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameNull"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (isContainSpecialCharacter(event)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameSpecialCharacter"),
              isVisible: true,
            },
          }));
          resolve();
        } else if (!isLengthInRange(event, 1, 255)) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: true,
              textError: props.t("Validate.validateNameMaxLength"),
              isVisible: true,
            },
          }));
          resolve();
        } else {
          setStudent((prevStudent) => ({
            ...prevStudent,
            name: event,
          }));
          setValidate((prevValidate) => ({
            ...prevValidate,
            name: {
              ...prevValidate.name,
              isError: false,
              isVisible: false,
            },
          }));
          resolve();
        }
      });
    },
    [validate]
  );

  const asyncForValidate = async () => {
    const validationPromises = [
      await handlePhoneChange(phone),
      await handleNameChange(name)
    ];
    await Promise.all(validationPromises);
  }

  useEffect(() => {
    if (isAllFieldsValidStudent(validate)) {
      axios
        .post<Faculty, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/student', student)
        .then((responseUpdate: any) => {
          const token = responseUpdate.data.data.token;
          axios
            .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
                sessionStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data));
                dispatch(setUserLogin(response.data.data))
                toast.success(props.t("Toast.toastUpdateProfileUnSuccess"));
                props.onHide();
              } else {
                toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
              }
            })
            .catch((error) => {
              toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
            });
        })
        .catch((error) => {
          toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
        });
    } else {
      let key: keyof StudentUpdate;
      for (key in validate) {
        if (validate[key].isError) {
          setValidate((prevValidate) => ({
            ...prevValidate,
            [key]: {
              ...prevValidate[key],
              isVisible: true,
            },
          }));
        }
      }
    }
  }, [isValidatePassed])

  const handleSubmitEvent = async () => {
    await asyncForValidate();
    setValidatePassed(!isValidatePassed);
  };

  const printBackground = useMemo(() => {
    let image;
    if (imageBackground.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageBackground} style={{ width: '100%', height: 300 }} />
        </div>
      );
    } else if (imageBackgroundTemporary.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageBackgroundTemporary} style={{ width: '100%', height: 300, borderRadius: 10 }} />
        </div>
      );
    } else {
      image = (
        <div className='img'>
          <img className='imageUpdate' src={'/assets/images/background-default.jpg'} style={{ width: '100%', height: 300, borderRadius: 10 }} />
        </div>
      );
    }
    return image;
  }, [imageBackground, imageBackgroundTemporary, backgroundHadSave]);

  const printAvatar = useMemo(() => {
    let image;
    if (imageAvatar.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className='imageUpdate' src={imageAvatar} style={{ width: 200, height: 200, borderRadius: 100 }} />
        </div>
      );
    } else if (imageAvatarTemporary.trim().length !== 0) {
      image = (
        <div className='img'>
          <img className='imageUpdate' src={imageAvatarTemporary} style={{ width: 200, height: 200, borderRadius: 100 }} />
        </div>
      );
    } else {
      image = (
        <div className='img'>
          <DefaultAvatar name={props.nameHadTranslated} size={300} styleBootstrap={undefined} />
        </div>
      );
    }
    return image;
  }, [imageAvatar, imageAvatarTemporary]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.t("ModalUpdate.modalUpdateTitle")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* name */}
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-user text-grey-500 pe-0'></i>
          <input
            id='name'
            value={name}
            type='text'
            onChange={(e) => handleNameChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("Validate.validateNameNull")}
            style={{ borderColor: !validate.name?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.name?.textError}
            isError={validate.name?.isError}
            isVisible={validate.name?.isVisible}
          />
        </div>
        {/* Phone */}
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-mobile text-grey-500 pe-0'> </i>
          <input
            id='phoneNumber'
            value={phone}
            type='text'
            onChange={(e) => handlePhoneChange(e.target.value)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={props.t("ModalUpdate.modalUpdatePlaceholderPhoneNumber")}
            style={{ borderColor: !validate.phone?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.phone?.textError}
            isError={validate.phone?.isError}
            isVisible={validate.phone?.isVisible}
          />
        </div>
        <div className='form-group icon-input' style={{ marginTop: 10, marginBottom: 40 }}>
          <div className='d-flex mt-3 p-0'>
            <input
              type={'file'}
              multiple
              ref={fileInputRefAvatar}
              className='hidden'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageAvatar(event)}
            />
            <button
              type='button'
              className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
              onClick={handleGetFilesAvatar}
              ref={buttonCallPickerImgRef}
            >
              <i className='font-md text-success feather-image me-2'></i>
              <span className='d-none-xs'>{props.t("ModalUpdate.modalUpdateAvatar")}</span>
            </button>
          </div>
          {
            avatarHadSave ?
              (<span style={{ background: 'red', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>
                {props.t("ModalUpdate.modalUpdateImageNotifyNotUpload")}</span>) : (<span style={{ background: 'green', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>{props.t("ModalUpdate.modalUpdateImageNotifyUploadSuccess")}</span>)
          }
          {printAvatar}
        </div>
        {/* Background */}
        <div className='form-group icon-input mb-3 mt-3'>
          <div className='d-flex mt-3 p-0'>
            <input
              type={'file'}
              multiple
              ref={fileInputRefBackground}
              className='hidden'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageBackground(event)}
            />
            <button
              type='button'
              className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
              onClick={handleGetFilesBackground}
              ref={buttonCallPickerImgRef}
            >
              <i className='font-md text-success feather-image me-2'></i>
              <span className='d-none-xs'>{props.t("ModalUpdate.modalUpdateBackground")}</span>
            </button>
          </div>
          {
            backgroundHadSave ?
              (<span style={{ background: 'red', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>
                {props.t("ModalUpdate.modalUpdateImageNotifyNotUpload")}</span>) : (<span style={{ background: 'green', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>{props.t("ModalUpdate.modalUpdateImageNotifyUploadSuccess")}</span>)
          }
          {
            printBackground
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!(backgroundHadSave === false && avatarHadSave === false)}
          onClick={() => handleSubmitEvent()} className='btn btn-outline-secondary bg-primary'>{props.t("ModalUpdate.modalUpdateButtonText")}</Button>
      </Modal.Footer>
    </Modal>
  );
}