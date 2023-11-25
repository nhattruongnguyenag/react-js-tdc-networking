import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { COLOR_BLACK } from '../constants/Color';
import CustomizeSkeletonUserProfile from '../components/skeleton/CustomizeSkeletonUserProfile';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import { getGroupForPost } from '../utils/GetGroup';
import { CALL_ACTION, CHANGE_INFO_USER_CLICK_ACTION, CLICK_CAMERA_AVATAR_EVENT, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND } from '../constants/Variables'
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
import { TEXT_EMAIL, TEXT_ERROR_CHECKSAMEEMAIL, TEXT_ERROR_EMAIL_NOTFORMAT, TEXT_ERROR_EMAIL_NOTIMPTY, TEXT_ERROR_EMAIL_NOTLENGTH, TEXT_ERROR_FACULITYNOTEMPTY, TEXT_ERROR_FACULTY_NAME, TEXT_ERROR_PHONE_NOTEMPTY, TEXT_ERROR_PHONE_NOTFORMAT, TEXT_ERROR_STUDENTNAME, TEXT_ERROR_STUDENTNAME_NOTLENGTHMAX, TEXT_ERROR_STUDENTNAME_NOTSPECIAL_CHARACTER, TEXT_IMAGE_BACKGROUND_PICKER, TEXT_IMAGE_PICKER, TEXT_NAME_FACULTY, TEXT_PHONE, TEXT_PLACEHOLDER_PHONE, TEXT_PLACEHOLDER_STUDENTNAME, TEXT_SELECT_FACULTY, TEXT_TITLE_REGISTER_STUDENT } from '../constants/StringVietnamese';
import { handleUploadImage } from '../utils/UploadUtils';
import { InputTextValidate, isBlank, isContainSpecialCharacter, isEmail, isLengthInRange, isPhone } from '../utils/ValidateUtils';
import axios, { AxiosResponse } from 'axios';
import { Token } from '../types/Token'
import { Data } from '../types/Data'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../constants/KeyValue';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../redux/Slice';

export default function UserDetailsPage() {
  const [modalShowOption, setModalShowOption] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const { slug } = useParams()
  const userId = getIdFromSlug(slug ?? '')
  // userId
  //  group
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


  const likeAction = (obj: LikeAction) => {
  }

  const renderItem = (item: any) => {
    return (
      <CustomizePost
        id={item.id}
        userId={item.user['id']}
        name={item.user['name']}
        avatar={item.user['image']}
        typeAuthor={'Doanh Nghiệp'}
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
                      isFollow={isFollow}
                      isSameUser={userLogin?.id === userId}
                      data={post}
                      role={typeAuthorPost}
                      userData={userInfo}
                      handleClickButtonEvent={handleClickButtonEvent}
                      handleClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent} />
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4'>
                      <div className='snippet mt-2 wrapperTitleUserProfile' data-title='.dot-typing'>
                        {/* <span className='txtTitleInUserProfile'>{userInfo?.name ?? ''}{' '}</span> */}
                        <FontAwesomeIcon className='iconArrowToRightUserProfile' icon={faPlay} size='1x' color={COLOR_BLACK} />
                        <span className='txtTitleInUserProfile'>{' '}{getGroupForPost(group)}</span>
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
      <ModalUpdateUserInfo
        show={modalShowUpdate}
        onHide={() => setModalShowUpdate(false)}
        user={userInfo}
      />
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
              <TabPanel hidden={selectedTab !== "saved"}>Bai viet da luu</TabPanel>
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


interface Faculty {
  name: InputTextValidate
  email: InputTextValidate
  phone: InputTextValidate
}

const isAllFieldsValid = (validate: Faculty): boolean => {
  let key: keyof Faculty

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }
  return true
}


interface ModalTypeUpdate {
  show: boolean
  onHide: () => void,
  user: any
}

function ModalUpdateUserInfo(props: Readonly<ModalTypeUpdate>) {
  const { slug } = useParams()
  const userId = getIdFromSlug(slug ?? '')
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [faculty, setFaculty] = useState({
    id: userId,
    email: '',
    name: '',
    image: '',
    background: '',
    phone: ''
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    // id: userId,
    // email: props.user?.email ?? '',
    // name: props.user?.name ?? '',
    // image: props.user?.image ?? '',
    // background: props.user?.image ?? '',
    // phone: props.user?.phone ?? ''
  }, [])


  const fileInputRefAvatar = useRef<HTMLInputElement | null>(null)
  const fileInputRefBackground = useRef<HTMLInputElement | null>(null)
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null)
  const [imageAvatar, setImageAvatar] = useState('')
  const [imageBackground, setImageBackground] = useState('')

  const [validate, setValidate] = useState<Faculty>({
    name: {
      textError: TEXT_ERROR_FACULTY_NAME,
      isVisible: false,
      isError: true
    },
    email: {
      textError: TEXT_ERROR_EMAIL_NOTIMPTY,
      isVisible: false,
      isError: true
    },
    phone: {
      textError: TEXT_ERROR_PHONE_NOTEMPTY,
      isVisible: false,
      isError: true
    }
  })

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
      setImageAvatar(URL.createObjectURL(event.target.files[0]))
      handleUploadImage(event.target.files, (response) => {
        console.log(response.data)
        setFaculty({ ...faculty, image: response.data[0] })
      })
    }
  }

  const onSelectUploadImageBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setImageBackground(URL.createObjectURL(event.target.files[0]))
      handleUploadImage(event.target.files, (response) => {
        console.log(response.data)
        setFaculty({ ...faculty, background: response.data[0] })
      })
    }
  }

  const handleCheckEmail = useCallback(() => {
    axios
      .post(SERVER_ADDRESS + `api/users/check?email=${faculty.email}`)
      .then((response) => {
        if (response.data.data == 0) {
          setValidate({
            ...validate,
            email: {
              ...validate.email,
              isError: true,
              textError: TEXT_ERROR_CHECKSAMEEMAIL,
              isVisible: true
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [faculty.email])


  const handleStudentNameChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: TEXT_ERROR_STUDENTNAME
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: TEXT_ERROR_STUDENTNAME_NOTSPECIAL_CHARACTER,
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: TEXT_ERROR_STUDENTNAME_NOTLENGTHMAX,
            isVisible: true
          }
        })
      } else {
        setFaculty({ ...faculty, name: event.target.value })
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const handlePhoneChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: TEXT_ERROR_PHONE_NOTEMPTY,
            isVisible: true
          }
        })
      } else if (!isPhone(event.target.value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: TEXT_ERROR_PHONE_NOTFORMAT,
            isVisible: true
          }
        })
      } else {
        setFaculty({ ...faculty, phone: event.target.value })
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const handleEmailChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: TEXT_ERROR_EMAIL_NOTIMPTY
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: TEXT_ERROR_EMAIL_NOTLENGTH
          }
        })
      } else if (!isEmail(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: TEXT_ERROR_EMAIL_NOTFORMAT
          }
        })
      } else {
        setFaculty({ ...faculty, email: event.target.value })
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const handleSubmitEvent = () => {
    if (isAllFieldsValid(validate)) {
      axios
        .post<Faculty, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/faculty', faculty)
        .then((response) => {
          toast.success('cap nhat thanh cong')
          props.onHide();
        })
        .catch((error) => {
          console.log(error)
          toast.error('Cap nhat that bai')
        })
    } else {
      let key: keyof Faculty

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }
      setValidate({ ...validate })
    }
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cập nhật thông tin tài khoản
        </Modal.Title>
        <button
          style={{ position: 'absolute', top: 0, right: 10 }}
          type='button'
          className='btn-close-modal-header close font-xl'
          onClick={props.onHide}
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        {
          JSON.stringify(props.user?.email)
        }
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-user text-grey-500 pe-0'> </i>
          <input
            type='text'
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={TEXT_NAME_FACULTY}
            onChange={(e) => handleStudentNameChange(e)}
            style={{ borderColor: !validate.name?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.name?.textError}
            isError={validate.name?.isError}
            isVisible={validate.name?.isVisible}
          />
        </div>
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-mobile text-grey-500 pe-0'> </i>
          <input
            type='text'
            onChange={(e) => handlePhoneChange(e)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={TEXT_PLACEHOLDER_PHONE}
            style={{ borderColor: !validate.phone?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.phone?.textError}
            isError={validate.phone?.isError}
            isVisible={validate.phone?.isVisible}
          />
        </div>
        <div className='form-group icon-input mb-3'>
          <i className='font-sm ti-user text-grey-500 pe-0'> </i>
          <input
            type='text'
            onBlur={() => handleCheckEmail()}
            onChange={(e) => handleEmailChange(e)}
            className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
            placeholder={TEXT_EMAIL}
            style={{ borderColor: !validate.email?.isError ? '#228b22' : '#eee' }}
          />
          <TextValidate
            textError={validate.email?.textError}
            isError={validate.email?.isError}
            isVisible={validate.email?.isVisible}
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
              <span className='d-none-xs'>{TEXT_IMAGE_PICKER}</span>
            </button>
          </div>
          <div className='img'>{imageAvatar ? <img src={imageAvatar} style={{ width: 200, height: 200, borderRadius: 100 }} /> : ''}</div>
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
              <span className='d-none-xs'>{TEXT_IMAGE_BACKGROUND_PICKER}</span>
            </button>
          </div>
          <div className='img'>{imageBackground ? <img src={imageBackground} style={{ width: '100%', height: 300, borderRadius: 10 }} /> : ''}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmitEvent()} className='btn btn-outline-secondary bg-primary'>Cập nhật</Button>
      </Modal.Footer>
    </Modal>

  );
}
