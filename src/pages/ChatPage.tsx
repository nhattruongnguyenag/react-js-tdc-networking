import classNames from 'classnames'
import moment from 'moment'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Client, Frame, Message } from 'stompjs'
import EmptyMessageList from '../components/common/EmptyMessageList'
import Header from '../components/common/Header'
import Loading from '../components/common/Loading'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setConversationMessages } from '../redux/Slice'
import { getStompClient } from '../sockets/SocketClient'
import { Message as MessageModel } from '../types/Message'
import { handleUploadImage } from '../utils/UploadUtils'
import MessageItem from '../components/message/MessageItem'
import { IMAGE_URL } from '../constants/Path'
import { useTranslation } from 'react-multi-lang'
import { User } from '../types/User'

let stompClient: Client

const RECEIVED = 0
const SEEN = 1
const SENDING = 2

export default function ChatPage() {
  const { selectConversation, conversationMessages } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(true)
  const [hiddenBtnScrollEnd, setHiddenBtnScrollEnd] = useState<boolean>(true)
  const [btnSendDisable, setBtnSendDisable] = useState<boolean>(true)
  const textInputMessageRef = useRef<HTMLInputElement | null>(null)
  const textInputImagesRef = useRef<HTMLInputElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const t = useTranslation()

  const getUserStatus = (user?: User): string => {
    let status = ''

    if (user?.status === 1) {
      status = t('MessengerToolbar.userStatusActive')
    } else {
      status = `${t('MessengerToolbar.userStatusInactive')} ` + moment(user?.lastActive).fromNow()
    }

    return status
  }

  const senderId = useMemo(() => {
    return selectConversation?.sender?.id
  }, [selectConversation])

  const receiverId = useMemo(() => {
    return selectConversation?.receiver?.id
  }, [selectConversation])

  const handleSendMessage = () => {
    if (textInputMessageRef.current && selectConversation) {
      const message = {
        senderId: senderId,
        receiverId: receiverId,
        type: 'plain/text',
        content: textInputMessageRef.current.value,
        status: RECEIVED
      }

      dispatch(
        setConversationMessages([
          ...conversationMessages,
          {
            content: textInputMessageRef.current.value,
            id: -1,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            sender: selectConversation.sender,
            receiver: selectConversation.receiver,
            type: 'plain/text',
            status: SENDING
          }
        ])
      )

      stompClient.send(`/app/messages/${senderId}/${receiverId}`, {}, JSON.stringify(message))
      textInputMessageRef.current.value = ''
      textInputMessageRef.current.focus()
      setBtnSendDisable(true)
    }
  }

  const onBtnSendClick = () => {
    handleSendMessage()
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [scrollRef, conversationMessages])

  useEffect(() => {
    stompClient = getStompClient()

    const onConnected = () => {
      if (stompClient.connected) {
        stompClient.subscribe(`/topic/messages/${senderId}/${receiverId}`, onMessageReceived)
        stompClient.send(`/app/messages/${senderId}/${receiverId}/listen`)
        setLoading(true)
      }
    }

    const onMessageReceived = (payload: Message) => {
      setLoading(false)
      const messages = JSON.parse(payload.body) as MessageModel[]
      dispatch(setConversationMessages(messages.reverse()))
      scrollRef.current?.scrollIntoView()
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }

    stompClient.connect({}, onConnected, onError)
  }, [])

  const onBtnUploadImageClick = () => {
    if (textInputImagesRef.current) {
      textInputImagesRef.current.showPicker()
      textInputImagesRef.current.value = ''
    }
  }

  const onFilePickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const urls: string[] = []
      for (let i = 0; i < event.target.files.length; i++) {
        urls.push(URL.createObjectURL(event.target.files[i]))
      }

      if (selectConversation) {
        let message: MessageModel = {
          content: urls.join(','),
          id: -1,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: '',
          sender: selectConversation.sender,
          receiver: selectConversation.receiver,
          type: moment().format('YYYY-MM-DD HH:mm:ss'),
          status: SENDING
        }

        dispatch(setConversationMessages([...conversationMessages, message]))
        handleUploadImage(event.target.files, (response) => {
          stompClient.send(
            `/app/messages/${senderId}/${receiverId}`,
            {},
            JSON.stringify({
              senderId: senderId,
              receiverId: receiverId,
              type: 'images',
              content: response.data.join(','),
              status: RECEIVED
            })
          )
        })
      }
    }
  }

  const onMessageContentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) {
      setBtnSendDisable(false)
    } else {
      setBtnSendDisable(true)
    }
  }

  //Thuc hien Enter tim kiem
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter') {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Fragment>
      <Header />

      <div className='nav-header bg-lightblue theme-dark-bg mt-[95px] px-2'>
        <div className='ms-2 rounded-full'>
          {selectConversation?.receiver.image ? (
            <img
              src={IMAGE_URL + selectConversation?.receiver.image}
              alt='user'
              className='me-4 h-14 w-14 rounded-full object-cover'
            />
          ) : (
            <div className='me-4 h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-400 to-blue-400'>
              <span>{selectConversation?.receiver.name[0]}</span>
            </div>
          )}
        </div>

        <div className='flex flex-col'>
          <h6 className='overflow-hidden text-ellipsis whitespace-nowrap font-bold'>
            {selectConversation?.receiver.name}
          </h6>

          <div className='align-items-center flex flex-row justify-start'>
            {selectConversation?.receiver.status === 1 && (
              <div
                className={classNames(
                  'me-2 h-2 w-2 rounded-full',
                  selectConversation?.receiver.status ? 'bg-success' : ''
                )}
              />
            )}

            <h5 className='mb-0 text-sm'>{getUserStatus(selectConversation?.receiver)}</h5>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading showTitle />
      ) : (
        <div className='main-content '>
          <button
            style={{ cursor: 'pointer' }}
            className={classNames(
              'fixed right-10 top-2/3 z-50 h-12 w-12 bg-blue-400',
              hiddenBtnScrollEnd ? 'hidden' : ''
            )}
            type='button'
            onClick={() => scrollRef.current?.scrollIntoView()}
          >
            <i className='ti-arrow-down text-[18px] font-bold text-white' />
          </button>
          <div className='middle-sidebar-bottom'>
            <div className='middle-sidebar-left pe-0' style={{ maxWidth: '100%' }}>
              <div className='row'>
                <div className='col-lg-12 position-relative'>
                  <div
                    onScroll={(e) => {
                      const isAtBottom =
                        e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight
                      setHiddenBtnScrollEnd(isAtBottom)
                    }}
                    className='chat-wrapper w-100 position-relative scroll-bar theme-dark-bg flex-col-reverse bg-white pt-0'
                  >
                    <div className='chat-body p-3 '>
                      <div className='messages-content pb-5'>
                        {conversationMessages.length > 0 ? (
                          conversationMessages.map((item, index) => {
                            const previousMessage = conversationMessages[index - 1]
                            let dayHeaderVisible = false
                            if (
                              index === 0 ||
                              (moment(item.createdAt).format('l') === moment(previousMessage.createdAt).format('l') &&
                                Math.abs(moment(item.createdAt).hours() - moment(previousMessage.createdAt).hours()) >
                                  3)
                            ) {
                              dayHeaderVisible = true
                            }

                            return <MessageItem headerVisible={dayHeaderVisible} key={index.toString()} data={item} />
                          })
                        ) : (
                          <EmptyMessageList />
                        )}
                        <div className='message-item' ref={scrollRef}></div>
                        <div className='clearfix h-9 bg-slate-500' />
                      </div>
                    </div>
                  </div>

                  <div className='chat-bottom dark-bg theme-dark-bg p-3 shadow-none' style={{ width: '97%' }}>
                    <form className='chat-form'>
                      <button className='bg-grey float-left' type='button' onClick={() => onBtnUploadImageClick()}>
                        <i className='ti-image text-grey-600' />
                      </button>
                      <input
                        type={'file'}
                        multiple
                        ref={textInputImagesRef}
                        className='hidden'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFilePickerChange(event)}
                      />
                      <div className='form-group cursor-pointer'>
                        <input
                          type='text'
                          ref={textInputMessageRef}
                          className='text-black'
                          placeholder='@ Tin nhắn...'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onMessageContentInputChange(e)}
                          onKeyDown={(event) => handleEnter(event)}
                        />
                      </div>
                      <button
                        style={{ cursor: 'pointer' }}
                        disabled={btnSendDisable}
                        className='bg-current disabled:opacity-50'
                        type='button'
                        onClick={() => onBtnSendClick()}
                      >
                        <i className='ti-arrow-right text-white' />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
