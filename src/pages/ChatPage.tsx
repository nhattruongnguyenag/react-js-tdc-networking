import { Fragment } from "react";
import Header from "../components/common/Header";
import { useEffect, useMemo, useRef, useState } from "react"
import { Client, Frame, Message } from "stompjs"
import { useAppDispatch, useAppSelector } from "../redux/Hook";
import { getStompClient } from "../sockets/SocketClient";
import { setConversationMessages } from "../redux/Slice";
import { Message as MessageModel } from "../types/Message";
import MessageItem from "../components/message/MessageItem";
import FlatList from "flatlist-react/lib";
import { Gallery } from "react-grid-gallery";
import { User } from "../types/User";
import { handleUploadImage } from "../utils/UploadUtils";

let stompClient: Client

export default function ChatPage() {
  const { userLogin, imagesUpload, selectConversation, conversationMessages } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(false)
  const [messageContent, setMessageContent] = useState<string>('')
  const textInputMessageRef = useRef<HTMLInputElement | null>(null)
  const textInputImagesRef = useRef<HTMLInputElement | null>(null)
  const endMessageRef = useRef<HTMLDivElement | null>(null)

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
      endMessageRef.current?.scrollIntoView()
      textInputMessageRef.current.value = ''
      textInputMessageRef.current.focus()
    }
  }

  useEffect(() => {
    endMessageRef.current?.scrollIntoView()
  }, [endMessageRef, conversationMessages])

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
          createdAt: 'Sending',
          updatedAt: '',
          sender: selectConversation.sender,
          receiver: selectConversation.receiver,
          type: 'images',
          status: 0
        }

        dispatch(setConversationMessages([...conversationMessages, message]))
        handleUploadImage(event.target.files, (response) => {
          console.log('response', response);
          stompClient.send(`/app/messages/${senderId}/${receiverId}`, {}, JSON.stringify({
            senderId: senderId,
            receiverId: receiverId,
            type: 'images',
            content: response.data.join(','),
            status: 0
          }))
        })
      }
    }
  }

  return (
    <Fragment>
      <Header />
      <div className='main-content right-chat-active'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0' style={{ maxWidth: '100%' }}>
            <div className='row'>
              <div className='col-lg-12 position-relative'>
                <div className='chat-wrapper w-100 position-relative  flex-col-reverse scroll-bar theme-dark-bg bg-white pt-0'>
                  <div className='chat-body p-3 '>
                    <div className='messages-content pb-5'>
                      {
                        conversationMessages.map((item, index) => (
                          <MessageItem
                            lastMessageRef={index === conversationMessages.length - 1 ? endMessageRef : undefined}
                            key={index.toString()}
                            data={item}
                          />
                        ))
                      }
                      <div className='clearfix bg-slate-500' />
                    </div>
                  </div>
                </div>
                <div className='chat-bottom dark-bg theme-dark-bg p-3 shadow-none' style={{ width: '98%' }}>
                  <form className='chat-form'>
                    <button className='bg-grey float-left relative'
                      type="button"
                      onClick={() => onBtnUploadImageClick()}>
                      <i className='ti-image text-grey-600' />
                    </button>
                    <input type={'file'} multiple
                      ref={textInputImagesRef}
                      className='bg-grey float-left hidden'
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFilePickerChange(event)} />
                    <div className='form-group z-50'>
                      <input type='text'
                        ref={textInputMessageRef}
                        className="text-black"
                        placeholder='@ Tin nhắn...'
                      />
                    </div>
                    <button className='bg-current' type="button"
                      onClick={() => onBtnSendClick()}>
                      <i className='ti-arrow-right text-white' />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
