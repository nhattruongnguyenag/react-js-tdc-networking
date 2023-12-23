import React, { LegacyRef, useCallback, useEffect, useRef, useState, useTransition } from 'react'
import UserItem from '../items/UserItem'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import SearchListView from '../listviews/SearchListView'
import { getStompClient } from '../../sockets/SocketClient'
import { Client, Frame } from 'stompjs'
import { useAppSelector } from '../../redux/Hook'
import axios from 'axios'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useTranslation } from 'react-multi-lang'
import '../../assets/css/search.css'
import { LikeAction } from '../../types/LikeActions'
import { LikeSearch } from '../../types/LikeSearch'
import { Alert } from 'flowbite-react'
import Loading from '../common/Loading'
import ReactLoading from 'react-loading'
import { bigLoading } from '../../constants/Variables'
let stompClient: Client
export default function CustomizeSearch() {
  const t = useTranslation()
  const [subjects, setSubjects] = useState([
    {
      label: t('SearchComponent.user'),
      value: 'user'
    },
    {
      label: t('SearchComponent.post'),
      value: 'post'
    }
  ])
  const [users, setUser] = useState([
    {
      name: t('SearchComponent.student'),
      value: 'sinh-vien'
    },
    {
      name: t('SearchComponent.business'),
      value: 'doanh-nghiep'
    },
    {
      name: t('SearchComponent.faculty'),
      value: 'khoa'
    }
  ])
  const [posts, setPost] = useState([
    {
      name: t('SearchComponent.normal'),
      value: 'thong-thuong'
    },
    {
      name: t('SearchComponent.survey'),
      value: 'khao-sat'
    },
    {
      name: t('SearchComponent.recruitment'),
      value: 'tuyen-dung'
    }
  ])


  const [sub, setSub] = useState('user')
  const [subLabel, setSubLabel] = useState(t('SearchComponent.user'))
  const [type, setType] = useState('')
  const [search, setSearch] = useState('')
  const { conversations, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [data, setData] = useState([])
  const [test, setTest] = useState()
  const ref = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const onMessageFindUserReceived = (payload: any) => {
    //kiem tra subjects
    if (sub == 'user') {
      setIsLoading(false);
      setData(JSON.parse(payload.body))
    }
  }

  const onMessageFindPostReceived = (payload: any) => {
    setIsLoading(false);
    setData(JSON.parse(payload.body))
  }

  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      if (stompClient.connected) {
        if (stompClient.connected) {
          stompClient.subscribe(`/topic/find/user`, onMessageFindUserReceived)
          stompClient.subscribe(`/topic/find/post`, onMessageFindPostReceived)
        }
      }
    }
    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])



  //Chuc nang tim kiem
  const handleSearch = () => {
    console.log(userLogin?.id + '-' + type + '-' + search);
    setIsLoading(true)
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
      stompClient.send(`/app/find/post/unsave`, {}, JSON.stringify({
        userId: userLogin?.id,
        type: type,
        search: search,
        postId: null
      }))
    }
  }
  
  //Thuc hien Enter tim kiem
  const handleEnter = (event: any) => {

    if (event.key == 'Enter') {
      handleSearch()
      console.log(data);

    }
  }

  //Theo doi
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

  //Like
  const likeAction = (obj: LikeAction) => {
    const likeData: Omit<LikeSearch, 'code'> = {
      postId: obj.postId,
      userId: obj.userId,
      type: type,
      search: search
    }
    like(likeData)
  }

  const like = useCallback((likeData: Omit<LikeSearch, 'code'>) => {
    console.log('123');
    stompClient.send(`/app/find/post/like`, {}, JSON.stringify(likeData))
  }, [sub])


  //Huy luu
  const handleUnSave = (idPost: number) => {
    console.log('123');
    stompClient.send(`/app/find/post/unsave`, {}, JSON.stringify({
      userId: userLogin?.id,
      type: type,
      search: search,
      postId: idPost
    }))
  }

  //Xoa bai viet (bai viet cua minh)
  const handleDelete = (idPost: number) => {

  }



  return (
    <div ref={ref} className='main-content bg-lightblue theme-dark-bg' style={{ height: '100vh' }}>
      <div className='middle-sidebar-bottom'>
        <div className='middle-sidebar-left'>
          <div className='middle-wrap'>
            <div className='card w-90 shadow-xs mb-2 border-0 bg-white p-0'>
              <div className='card-body p-lg-5 w-100 border border-info p-0 bar_search_div' id='card_search'>
                <div className='header-search ms-1'>
                  <div className='form-group  mb-6'>
                    <div className='div_icon_search' style={{ position: 'absolute' }}>
                      <i className='feather-search font-sm text-info icon_search' />
                    </div>
                    <input
                      type='search'
                      value={search}
                      placeholder={t('SearchComponent.search')}
                      className='bg-grey lh-32 font-xssss fw-600 text-grey-700 rounded-xl border-0 pb-2.5 pe-3 ps-5 pt-2.5 search_bar'
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
                      className=' dropdown_subjects '
                      variant='success'
                      id='dropdown-basic'
                    // style={{ width: 250, fontSize: 13 , backgroundColor: 'white' }}
                    style={{ color: 'black' }}
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
                            setType('')
                            setSubLabel(subject.label)
                          }}
                        >
                          {subject.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className='type_sub_btn' >
                  {sub === 'user'
                    ? users.map((item, index) => (
                      <button
                        key={index}
                        className='btn type_btn'
                        style={{ backgroundColor: item.value == type ? '#16a9bd' : 'white' }}
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
                        className='btn type_btn'
                        style={{ backgroundColor: item.value == type ? '#16a9bd' : 'white', color: item.value == type ? 'white' : 'black' }}
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
            <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 550 }}>
              {
                isLoading ?
                  <div className='loadingSearch'>
                    {bigLoading}
                  </div> :
                  (data.length != 0 ?
                    <SearchListView data={data} sub={sub} handleFollow={handleFollow} handleUnSave={handleUnSave} likeAction={likeAction} handleDelete={handleDelete} />
                    :
                    <div className='loadingSearch'>
                      <p className='txt_no_result text-dark'>{t('SearchComponent.txt')}</p>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
