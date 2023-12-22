import { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { numberDayPassed } from '../utils/FormatTime'
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton'
import { useGetBusinessPostsQuery } from '../redux/Service'
import { LikeAction } from '../types/LikeActions'
import { Post } from '../types/Post'
import { handleDataClassification } from '../utils/DataClassfications'
import { TYPE_POST_BUSINESS } from '../constants/StringVietnamese'
import CustomizePost from '../components/post/CustomizePost'
import CreatePostSelector from '../components/CreatePostSelector'
import { useAppSelector } from '../redux/Hook'
import { getPostActive } from '../utils/GetPostActive'
import { BUSINESS_GROUP } from '../constants/Variables'
import ButtonBackToTop from '../components/common/ButtonBackToTop'

export default function BusinessDashboardPage() {
  const code = 'group_connect_business'
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post[]>([]);
  const { data, isFetching } = useGetBusinessPostsQuery(
    { id: userLogin?.id ?? 0 },
    {
      pollingInterval: 500
    }
  );
  useEffect(() => {
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setPost([]);
      const tempPost = handleDataClassification(data, TYPE_POST_BUSINESS);
      setPost(tempPost);
    }
  }, [data])

  const likeAction = (obj: LikeAction) => {
    // TODO
  }
  const handleUnSave = () => {
    // TODO
  }

  const renderItem = (item: any) => {
    if (getPostActive(item.active)) {
      return (
        <CustomizePost
          key={item.id}
          id={item.id}
          userId={item.user['id']}
          name={item.user['name']}
          avatar={item.user['image']}
          typeAuthor={TYPE_POST_BUSINESS}
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
          isConduct={item.isConduct ?? null}
          isSave={item.isSave}
          group={code}
          handleUnSave={handleUnSave}
          active={item.active} iCustomizeLikeAction={false}        />
      )
    } else {
      return null;
    }
  }

  return (
    <>
      <Header />
      <div className='main-content bg-lightblue theme-dark-bg'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='middle-wrap'>
              {/* Skeleton */}
              {isLoading && (
                <div>
                  <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                    <CustomizeSkeleton />
                  </div>
                  <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                    <CustomizeSkeleton />
                  </div>
                </div>
              )}

              {/* Modal create  post */}
              {
                userLogin?.roleCodes === TYPE_POST_BUSINESS && <CreatePostSelector
                  id={userLogin?.id}
                  group={BUSINESS_GROUP}
                  avatar={userLogin?.image}
                  name={userLogin?.name}
                  groupName={code}
                />
              }
              {/* Render post */}
              {data?.data.map((item: any) => renderItem(item))}
              <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4 text-center'>
                <div className='snippet me-auto ms-auto mt-2' data-title='.dot-typing'>
                  <div className='stage'>
                    <div className='dot-typing' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='app-footer bg-primary-gradiant border-0 shadow-lg'>
        <a className='nav-content-bttn nav-center' href='/home'>
          <i className='feather-home' />
        </a>
        <a className='nav-content-bttn' href='/defaultvideo'>
          <i className='feather-package' />
        </a>
        <a className='nav-content-bttn' data-tab='chats' href='/defaultlive'>
          <i className='feather-layout' />
        </a>
        <a className='nav-content-bttn' href='/shop2'>
          <i className='feather-layers' />
        </a>
        <a className='nav-content-bttn' href='/defaultsettings'>
          <img src='/assets/images/female-profile.png' alt='user' className='w30 shadow-xss' />
        </a>
      </div>
      {/*  */}
      <ButtonBackToTop />
    </>
  )
}
