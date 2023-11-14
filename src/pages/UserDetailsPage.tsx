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

export default function UserDetailsPage() {
  const { slug } = useParams()
  // userId
  const userId = getIdFromSlug(slug ?? '')
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
        group={'group_tdc'}
      />
    )
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
                    <CustomizeSkeleton />
                  </div>
                  : <div className='col-12'>
                    <CustomizeProfile
                      data={post}
                      role={typeAuthorPost}
                      userData={userInfo}
                    />
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4'>
                      <div className='snippet mt-2 wrapperTitleUserProfile' data-title='.dot-typing'>
                        <span className='txtTitleInUserProfile'>Bài viết trong nhóm : {userInfo?.name}</span>
                        <FontAwesomeIcon className='iconArrowToRightUserProfile' icon={faPlay} size='1x' color={COLOR_BLACK} />
                        <span className='txtTitleInUserProfile'>{' '}{group}</span>
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
    </>
  )
}
