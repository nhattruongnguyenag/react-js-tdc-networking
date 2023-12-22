import classNames from 'classnames'
import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SELECTED_CONVERSATION } from '../constants/KeyValue'
import { CONVERSATION_ITEM_COMPONENT_IMAGE_MESSAGE_ANNOTATION } from '../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setSelectConversation } from '../redux/Slice'
import { Conversation } from '../types/Conversation'
import { getConversationLastUpdate } from '../utils/DateTimeUtils'
import { IMAGE_URL } from '../constants/Path'

interface ConversationItemProps {
  data: Conversation
}

export default function ConversationItem(props: ConversationItemProps) {
  const dispatch = useAppDispatch()
  const { conversations } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  const onItemClick = useCallback(() => {
    sessionStorage.setItem(SELECTED_CONVERSATION, JSON.stringify(props.data))
    dispatch(setSelectConversation(props.data))
  }, [conversations])

  const lastMessageContent = useMemo(() => {
    if (props.data.lastMessageType === 'images') {
      return `[${CONVERSATION_ITEM_COMPONENT_IMAGE_MESSAGE_ANNOTATION}]`
    }

    return props.data.lastMessageContent
  }, [conversations])

  return (
    <li onClick={() => onItemClick()}>
      <Link
        className={classNames(
          'rounded-3 flex flex-row border-b pb-4 pt-4',
          props.data.countNewMessage > 0 ? 'bg-lightblue theme-light-bg' : ''
        )}
        to={'/nhan-tin'}
      >
        <span className={classNames('btn-round-xss me-2 ms-0', props.data?.receiver.status ? 'bg-success' : '')} />

        <div className='ms-2 rounded-full'>
          {props.data.receiver.image ? (
            <img
              src={IMAGE_URL + props.data.receiver.image}
              alt='user'
              className='rounded-ful me-4 h-12  w-12  rounded-lg object-cover'
            />
          ) : (
            <div className='me-4 h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-400 to-blue-400'>
              <span>{props.data.receiver.name[0]}</span>
            </div>
          )}
        </div>

        <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0 w-60  overflow-hidden text-ellipsis whitespace-nowrap'>
          {props.data?.receiver.name}
        </h6>

        <div className='email-text text-grey-500 fw-600 font-xssss me-2 ms-2'>{lastMessageContent}</div>

        {props.data.countNewMessage > 0 && (
          <span className='flex h-7 w-7 items-center justify-center rounded-full bg-red-500'>
            <span className='font-bold text-white'>{props.data.countNewMessage}</span>
          </span>
        )}
        <div className='font-xssss text-grey-500 fw-600 ms-auto'>
          {getConversationLastUpdate(props.data?.lastMessageSentAt ?? '')}
        </div>
      </Link>
    </li>
  )
}
