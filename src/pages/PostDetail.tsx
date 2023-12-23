import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useLocation, useParams } from 'react-router-dom'
import { getIdFromSlug, getTokenFromSlug } from '../utils/CommonUtls'
import axios from 'axios'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { POST_LOG } from '../constants/TypeNotification'
import CustomizePost from '../components/post/CustomizePost'
import { numberDayPassed } from '../utils/FormatTime'
import { LikeAction } from '../types/LikeActions'
import { useAppSelector } from '../redux/Hook'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useGetDetailPostQuery } from '../redux/Service'
let stompClient: Client

export default function PostDetail() {
  const { slug } = useParams()
  const id = getIdFromSlug(slug ?? '')
  const location = useLocation();
  const { notificationType } = location.state || {};
  const { notificationContent } = location.state || {};
  const [data1, setData] = useState<any>()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const { data, isFetching } = useGetDetailPostQuery({
    userId: userLogin?.id,
    postId: id ?? 0,
  },
    {
      pollingInterval: 1000
    })

  useEffect(() => {
    setData(data?.data)
    // console.log(data);
    // console.log(userLogin?.id + ' ' + id);
    
  }, [data])

  const likeAction = (obj: LikeAction) => {
    axios.post(`${SERVER_ADDRESS}api/posts/like`, {
      postId: id,
      userId: userLogin?.id
    })
  }

  const handleUnSave = (idPost: number) => {
  }


  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='row feed-body'>
              {
                data1 ? <CustomizePost
                  key={data1.id}
                  id={data1.id}
                  userId={data1.user['id']}
                  name={data1.user['name']}
                  avatar={data1.user['image']}
                  typeAuthor={'Doanh Nghiệp'}
                  available={null}
                  timeCreatePost={numberDayPassed(data1.createdAt)}
                  content={data1.content}
                  type={data1.type}
                  likes={data1.likes}
                  comments={data1.comment}
                  commentQty={data1.commentQuantity}
                  images={data1.images}
                  role={data1.user['roleCodes']}
                  likeAction={likeAction}
                  location={data1.location ?? null}
                  title={data1.title ?? null}
                  expiration={data1.expiration ?? null}
                  salary={data1.salary ?? null}
                  employmentType={data1.employmentType ?? null}
                  description={data1.description ?? null}
                  isConduct={data1.isConduct ?? null}
                  isSave={data1.isSave}
                  group={''}
                  handleUnSave={handleUnSave}
                  active={1} iCustomizeLikeAction={false}                /> : <></>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )


}
