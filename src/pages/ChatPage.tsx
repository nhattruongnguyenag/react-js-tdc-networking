import classNames from 'classnames'
import moment from 'moment'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Client, Frame, Message } from 'stompjs'
import Header from '../components/common/Header'
import MessageItem from '../components/message/MessageItem'
import { USER_LOGIN_KEY } from '../constants/KeyValue'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setConversationMessages } from '../redux/Slice'
import { getStompClient } from '../sockets/SocketClient'
import { Message as MessageModel } from '../types/Message'
import { handleUploadImage } from '../utils/UploadUtils'

let stompClient: Client

export default function ChatPage() {
  const { selectConversation, conversationMessages } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(false)
  const [hiddenBtnScrollEnd, setHiddenBtnScrollEnd] = useState<boolean>(true)
  const [btnSendDisable, setBtnSendDisable] = useState<boolean>(true)
  const textInputMessageRef = useRef<HTMLInputElement | null>(null)
  const textInputImagesRef = useRef<HTMLInputElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const senderId = useMemo(() => {
    return selectConversation?.sender?.id
  }, [selectConversation])

  const receiverId = useMemo(() => {
    return selectConversation?.receiver?.id
  }, [selectConversation])

  const onBtnSendClick = () => {
    if (textInputMessageRef.current) {
      const message = {
        senderId: senderId,
        receiverId: receiverId,
        type: 'plain/text',
        content: textInputMessageRef.current.value,
        status: 0
      }

      stompClient.send(`/app/messages/${senderId}/${receiverId}`, {}, JSON.stringify(message))
      textInputMessageRef.current.value = ''
      textInputMessageRef.current.focus()
      setBtnSendDisable(true)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [scrollRef, conversationMessages])

  useEffect(() => {
    stompClient = getStompClient()

    const onConnected = () => {
      setLoading(true)
      if (stompClient.connected) {
        stompClient.subscribe(`/topic/messages/${senderId}/${receiverId}`, onMessageReceived)
        stompClient.send(`/app/messages/${senderId}/${receiverId}/listen`)
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

      console.log(urls)

      if (selectConversation) {
        let message: MessageModel = {
          content: urls.join(','),
          id: -1,
          createdAt: 'Sending',
          updatedAt: '',
          sender: selectConversation.sender,
          receiver: selectConversation.receiver,
          type: 'images',
          status: -1
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
              status: 0
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

  return (
    <Fragment>
      <Header />
      <div className='container'>
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
        <div className='main-content '>
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
                        {conversationMessages.map((item, index) => {
                          const previousMessage = conversationMessages[index - 1]
                          let dayHeaderVisible = false
                          if (
                            index === 0 ||
                            (moment(item.createdAt).format('l') === moment(previousMessage.createdAt).format('l') &&
                              Math.abs(moment(item.createdAt).hours() - moment(previousMessage.createdAt).hours()) > 3)
                          ) {
                            dayHeaderVisible = true
                          }

                          return <MessageItem headerVisible={dayHeaderVisible} key={index.toString()} data={item} />
                        })}
                        <div className='message-item' ref={scrollRef}></div>
                        <div className='clearfix h-9 bg-slate-500' />
                      </div>
                    </div>
                  </div>
                  <div className='chat-bottom dark-bg theme-dark-bg p-3 shadow-none' style={{ width: '98%' }}>
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
      </div>
    </Fragment>
  )
}
