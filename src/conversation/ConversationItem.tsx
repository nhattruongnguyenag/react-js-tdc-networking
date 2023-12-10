import classNames from 'classnames'
import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SELECTED_CONVERSATION } from '../constants/KeyValue'
import { CONVERSATION_ITEM_COMPONENT_IMAGE_MESSAGE_ANNOTATION } from '../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setSelectConversation } from '../redux/Slice'
import { Conversation } from '../types/Conversation'
import { getConversationLastUpdate } from '../utils/DateTimeUtils'

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
          'rounded-3 border-b pb-4 pt-4',
          props.data.countNewMessage > 0 ? 'bg-lightblue theme-light-bg' : ''
        )}
        to={'/nhan-tin'}
      >
        <div className='email-user'>
          <span className={classNames('btn-round-xss me-2 ms-0', props.data?.receiver.status ? 'bg-success' : '')} />
          <div className='ms-2'>
            {props.data.receiver.image ? (
              <img src='assets/images/user-12.png' alt='user' className='me-4 w-12' />
            ) : (
              <div className='me-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-400'>
                <span>{props.data.receiver.name[0]}</span>
              </div>
            )}
          </div>
          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0 '>{props.data?.receiver.name}</h6>
        </div>

        <div className='email-text text-grey-500 fw-600 font-xssss'>{lastMessageContent}</div>
        {props.data.countNewMessage > 0 && (
          <span className='flex h-7 w-7 items-center justify-center rounded-full bg-red-500'>
            <span className='font-bold text-white'>{props.data.countNewMessage}</span>
          </span>
        )}
        <div className='font-xssss text-grey-500 fw-600 w-52 text-right'>
          {getConversationLastUpdate(props.data?.lastMessageSentAt ?? '')}
        </div>
      </Link>
    </li>
  )
}
