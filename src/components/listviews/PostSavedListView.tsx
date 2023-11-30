import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { getStompClient } from '../../sockets/SocketClient'
import { Client, Frame } from 'stompjs'
import { Post } from '../../types/Post'
import { useAppSelector } from '../../redux/Hook'
import axios from 'axios'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import CustomizePost from '../post/CustomizePost'

let stompClient: Client
const PostSavedListView = () => {
  const [data, setData] = useState<Post[]>([])
  // const [dataSearch, setDataType] = useState<Post[]>([])
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState(null)
  const [dataFilter, setDataFilter] = useState<Post[]>([])

  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/save/page`, onMessageReceived)
    }
    const onMessageReceived = (payload: any) => {
      setData(JSON.parse(payload.body))
    }
    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])

  const handleUnSave = (post_id: number) => {
    stompClient.send(
      `/app/posts/user/unsave`,
      {},
      JSON.stringify({
        userId: userLogin?.id,
        postId: post_id
      })
    )
  }

  useEffect(() => {
    axios
      .get(`${SERVER_ADDRESS}api/posts/user/save/${userLogin?.id}`)
      .then((response) => {
        setData(response.data.data)
      })
  }, [])

  useEffect(() => {
    // if (search.trim() === '') {
    //   axios
    //     .get(`${SERVER_ADDRESS}api/posts/user/save/${userLogin?.id}`)
    //     .then((response) => {
    //       setData(response.data.data)
    //     })
    // }
    const dataSearch = []
    for (let index = 0; index < data.length; index++) {
      if (data[index].type == 'thong-thuong') {
        if (data[index].content.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          dataSearch.push(data[index])
        }
      } else {
        if (data[index].title?.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          dataSearch.push(data[index])
        }
      }
    }
    setDataFilter(dataSearch)
  }, [search])

  const likeAction = () => { }
  return (
    <div>

      <div style={{ position: 'relative' }}>
        <input
          type='search'
          placeholder='Tìm kiếm ...'
          style={{ width: '100%', marginBottom: 20, marginTop: 20, paddingLeft: 60, paddingRight: 30, borderWidth: '1px', height: '50px', borderRadius: 50 }}
          onChange={(txt) => {
            setSearch(txt.target.value)
          }} />
        <FontAwesomeIcon style={{ position: 'absolute', left: 27, top: 35, fontSize: 20 }} icon={faSearch} color='grey' />

      </div>
      <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 550 }}>
        {
          search == '' ?
            data.map((item: any) =>
              <CustomizePost
                id={item.id}
                userId={item.user['id']}
                name={item.user['name']}
                avatar={item.user['image']}
                typeAuthor={'Doanh Nghiệp'}
                available={null}
                timeCreatePost={item.createdAt}
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
                isSave={item.isSave}
                group={''}
                isConduct={null}
                handleUnSave={handleUnSave}
              />
            )
            :
            dataFilter.map((item: any) =>
              <CustomizePost
                id={item.id}
                userId={item.user['id']}
                name={item.user['name']}
                avatar={item.user['image']}
                typeAuthor={'Doanh Nghiệp'}
                available={null}
                timeCreatePost={item.createdAt}
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
                isSave={item.isSave}
                group={''}
                isConduct={null}
                handleUnSave={handleUnSave}
              />
            )
        }
      </div>
    </div>
  )
}

export default PostSavedListView