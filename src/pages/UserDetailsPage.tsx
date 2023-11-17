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
import { Faculty } from '../types/Faculty';
import { Business } from '../types/Business';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { COLOR_BLACK } from '../constants/Color';
import CustomizeSkeletonUserProfile from '../components/skeleton/CustomizeSkeletonUserProfile';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import { getGroupForPost } from '../utils/GetGroup';
import { CALL_ACTION, CLICK_CAMERA_AVATAR_EVENT, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND } from '../constants/Variables'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../components/example/TabSelector";
import FollowListView from '../components/listviews/FollowListView';
import FollowerListView from '../components/listviews/FollowerListView';
import '../assets/css/profile.css'

export default function UserDetailsPage() {
  const [modalShow, setModalShow] = React.useState(false);
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
      alert('follow');
    } else if (flag === CALL_ACTION) {
      alert('call');
    } else {
      handleClickIntoButtonMenu3dotEvent();
    }
  }

  const handleClickIntoButtonMenu3dotEvent = () => {
    setModalShow(true)
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
                  <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                    <CustomizeSkeletonUserProfile />
                    <div className='spaceSkletonUserProfile'></div>
                    <CustomizeSkeleton />
                  </div>
                  : <div className='col-12'>
                    <CustomizeProfile
                      data={post}
                      role={typeAuthorPost}
                      userData={userInfo}
                      handleClickButtonEvent={handleClickButtonEvent}
                      handleClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent} />
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4'>
                      <div className='snippet mt-2 wrapperTitleUserProfile' data-title='.dot-typing'>
                        <span className='txtTitleInUserProfile'>{userInfo?.name}{' '}</span>
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
      <ModalUserLiked
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}



interface ModalType {
  show: boolean
  onHide: () => void,
}

function ModalUserLiked(props: Readonly<ModalType>) {
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
