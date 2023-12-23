import React, { useEffect, useState } from 'react'
import { Post } from '../types/Post';
import { numberDayPassed } from '../utils/FormatTime';
import Header from '../components/common/Header';
import { useGetStudentPostsQuery } from '../redux/Service';
import { handleDataClassification } from '../utils/DataClassfications';
import { LikeAction } from '../types/LikeActions';
import { TYPE_POST_STUDENT } from '../constants/StringVietnamese';
import CustomizePost from '../components/post/CustomizePost';
import CreatePostSelector from '../components/CreatePostSelector';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import { useAppSelector } from '../redux/Hook';
import { getPostActive } from '../utils/GetPostActive';
import { TDC_GROUP } from '../constants/Variables';
import ButtonBackToTop from '../components/common/ButtonBackToTop';

export default function StudentDashboardPage() {
  const code = 'group_tdc'
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post[]>([]);
  const { data, isFetching } = useGetStudentPostsQuery({
    id: userLogin?.id ?? 0
  }, {
    pollingInterval: 500
  });

  useEffect(() => {
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      const tempPost = handleDataClassification(data, TYPE_POST_STUDENT);
      setPost(tempPost);
    }
  }, [data]);

  const likeAction = (obj: LikeAction) => {
    // TODO
  }
  const handleUnSave = () => {
    // TODO
  }

  const renderItem = (item: any) => {
    if (getPostActive(item.active)) {
      return <CustomizePost
        key={item.id}
        id={item.id}
        userId={item.user['id']}
        name={item.user['name']}
        avatar={item.user['image']}
        typeAuthor={TYPE_POST_STUDENT}
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
        group={code}
        handleUnSave={handleUnSave}
        active={item.active}
        iCustomizeLikeAction={false}
      />
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
              {
                userLogin?.roleCodes == TYPE_POST_STUDENT && <CreatePostSelector
                  id={userLogin?.id}
                  group={TDC_GROUP}
                  avatar={userLogin?.image}
                  name={userLogin?.name}
                  groupName={code}
                />
              }
              {/* Render post */}
              {data?.data.map((item: any) => renderItem(item))}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <ButtonBackToTop />
    </>
  )
}