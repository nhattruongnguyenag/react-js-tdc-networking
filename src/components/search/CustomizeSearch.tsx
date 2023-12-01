import React, { LegacyRef, useCallback, useEffect, useRef, useState } from 'react'
import UserItem from '../items/UserItem'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import SearchListView from '../listviews/SearchListView'
import { getStompClient } from '../../sockets/SocketClient'
import { Client, Frame } from 'stompjs'
import { useAppSelector } from '../../redux/Hook'
import axios from 'axios'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'

let stompClient: Client
export default function CustomizeSearch() {
  const [subjects, setSubjects] = useState([
    {
      label: 'Người dùng',
      value: 'user'
    },
    {
      label: 'Bài viết',
      value: 'post'
    }
  ])
  const [users, setUser] = useState([
    {
      name: 'Sinh viên',
      value: 'sinh-vien'
    },
    {
      name: 'Doanh nghiệp',
      value: 'doanh-nghiep'
    },
    {
      name: 'Khoa',
      value: 'khoa'
    }
  ])
  const [posts, setPost] = useState([
    {
      name: 'Bài viết',
      value: 'thong-thuong'
    },
    {
      name: 'Khảo sát',
      value: 'khao-sat'
    },
    {
      name: 'Tin tuyển dụng',
      value: 'tuyen-dung'
    }
  ])
  const [sub, setSub] = useState('user')
  const [subLabel, setSubLabel] = useState('Người dùng')
  const [type, setType] = useState('')
  const [search, setSearch] = useState('')
  const { conversations, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [data, setData] = useState([])
  const ref = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      if (stompClient.connected) {
        stompClient.subscribe(`/topic/find/${sub}`, onMessageReceived)
      }
    }
    const onMessageReceived = (payload: any) => {
      setData(JSON.parse(payload.body))
      console.log(JSON.parse(payload.body))
    }
    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])

  useEffect(() => {
    setData([])
  }, [type, sub])

  const handleSearch = () => {
    console.log(userLogin?.id + '-' + type + '-' + search);
    
    if (sub == 'user') {
      stompClient.send(
        `/app/find/user/follow`,
        {},
        JSON.stringify({
          userId: userLogin?.id,
          type: type,
          name: search,
          userFollowId: null
        })
      )
    } else {
      axios
        .post(`${SERVER_ADDRESS}api/find/post`, {
          userId: userLogin?.id,
          type: type,
          name: search
        })
        .then((response) => {
          setData(response.data.data)          
        })
    }
  }

  const handleEnter = (event: any) => {
    if (event.key == 'Enter') {
      handleSearch()
    }
  }


  const handleFollow = (userFollowId: number) => {
    stompClient.send(
      `/app/find/user/follow`,
      {},
      JSON.stringify({
        userId: userLogin?.id,
        type: type,
        name: search,
        userFollowId: userFollowId
      })
    )
  }

  return (
    <div ref={ref} className='main-content bg-lightblue theme-dark-bg' style={{ height: '100vh' }}>
      <div className='middle-sidebar-bottom'>
        <div className='middle-sidebar-left'>
          <div className='middle-wrap'>
            <div className='card w-90 shadow-xs mb-2 border-0 bg-white p-0'>
              <div className='card-body p-lg-5 w-100 border-0 p-0' id='card_search'>
                <div className='header-search ms-1'>
                  <div className='form-group icon-input mb-6'>
                    <div style={{ position: 'absolute', paddingBottom: 20 }}>
                      <i className='feather-search font-sm text-info' />
                    </div>
                    <input
                      type='search'
                      value={search}
                      placeholder='Tìm kiếm ...'
                      className='bg-grey lh-32 font-xssss fw-600 text-grey-700 rounded-xl border-0 pb-2.5 pe-3 ps-5 pt-2.5'
                      style={{ width: '97%', fontSize: 20 }}
                      onChange={(txt) => {
                        setSearch(txt.target.value)
                      }}
                      onKeyDown={handleEnter}
                      ref={searchInputRef}
                    />
                  </div>
                </div>
                {/*  */}
                <div>
                  <Dropdown>
                    <Dropdown.Toggle
                      className='text-dark'
                      variant='success'
                      id='dropdown-basic'
                      style={{ width: 250, fontSize: 13 }}
                    >
                      {subLabel}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: 250 }}>
                      {subjects.map((subject, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setData([])
                            setSub(subject.value)
                            setSubLabel(subject.label)
                          }}
                        >
                          {subject.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                {/* <div>
                                    <button type="button" className='btn btn-info' onClick={handleSearch}>Tim kiem</button>
                                </div> */}
                <div style={{ position: 'absolute', right: '10%', bottom: '25%' }}>
                  {sub === 'user'
                    ? users.map((item, index) => (
                        <button
                          key={index}
                          style={{ borderRadius: 50, marginLeft: 20 }}
                          className='btn btn-primary'
                          onClick={() => {
                            setType(item.value)
                          }}
                        >
                          {item.name}
                        </button>
                      ))
                    : posts.map((item, index) => (
                        <button
                          key={index}
                          style={{ borderRadius: 50, marginLeft: 20 }}
                          className='btn btn-primary'
                          onClick={() => {
                            setType(item.value)
                          }}
                        >
                          {item.name}
                        </button>
                      ))}
                </div>
              </div>
              {/*  */}
            </div>
            <SearchListView data={data} type={sub} handleFollow={handleFollow} />
          </div>
        </div>
      </div>
    </div>
  )
}

// if (ref.current) {
//     ref.current.addEventListener('keypress', event => {
//         if (event.key == 'Enter') {
//             handleSearch()
//         }
//     })
// }
