import React, { useEffect, useState } from 'react'
import { Post } from '../types/Post';
import { numberDayPassed } from '../utils/FormatTime';
import Header from '../components/common/Header';
import { useGetAllPostsQuery, useGetFacultyPostsQuery } from '../redux/Service';
import { handleDataClassification } from '../utils/DataClassfications';
import { LikeAction } from '../types/LikeActions';
import { TYPE_POST_FACULTY } from '../constants/StringVietnamese';
import CustomizePost from '../components/post/CustomizePost';
import CreatePostSelector from '../components/CreatePostSelector';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import { useAppSelector } from '../redux/Hook';

export default function FacultyDashboardPage() {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post[]>([]);
  const { data, isFetching } = useGetFacultyPostsQuery(
    {
      faculty: 'group_dien_dien_tu'
    },
    {
      pollingInterval: 1000
    }
  );

  useEffect(() => {
    setIsLoading(true)
  }, [])

  // Xử lý dữ liệu từ Redux Toolkit Query
  useEffect(() => {
    if (data) {
      setIsLoading(false);
      const tempPost = handleDataClassification(data, TYPE_POST_FACULTY);
      setPost(tempPost);
    }
  }, [data]);

  const likeAction = (obj: LikeAction) => {
    // obj.code = TYPE_POST_BUSINESS
    // like(obj)
  }

  // const like = useCallback((likeData: LikeAction) => {
  // stompClient.send(`/app/posts/${likeData.code}/like`, {}, JSON.stringify(likeData))
  // }, [])
  // End post
  // -------------------------------------


  const renderItem = (item: any) => {
    return <CustomizePost
      key={item.id}
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
    />
  }

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='row feed-body'>
              <div className='col-xl-8 col-xxl-9 col-lg-8'>
                {/* Skeleton */}
                {
                  isLoading && <div>
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                      <CustomizeSkeleton />
                    </div>
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                      <CustomizeSkeleton />
                    </div>
                  </div>
                }

                {/* Modal */}
                <CreatePostSelector />
                {/* Render post */}
                {data?.data.map((item) => renderItem(item))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
