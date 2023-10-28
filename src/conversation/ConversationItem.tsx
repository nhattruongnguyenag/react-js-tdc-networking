import classNames from "classnames"
import { useCallback, useMemo } from "react"
import { Link } from "react-router-dom"
import { SELECTED_CONVERSATION } from "../constants/KeyValue"
import { useAppDispatch, useAppSelector } from "../redux/Hook"
import { setSelectConversation } from "../redux/Slice"
import { Conversation } from "../types/Conversation"
import { getConversationLastUpdate } from "../utils/DateTimeUtils"

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
            return '[Hình ảnh]'
        }

        return props.data.lastMessageContent
    }, [conversations])

    return (
        <li onClick={() => onItemClick()}>
            <Link className={classNames('pt-4 pb-4 rounded-3 border-b',
                props.data.countNewMessage > 0 ? 'bg-lightblue theme-light-bg' : '')} to={'/nhan-tin'}>
                <div className='email-user'>
                    <span className={classNames('btn-round-xss me-2 ms-0',
                        props.data?.receiver.status ? 'bg-success' : '')} />
                    <div className="ms-2">
                        {
                            props.data.receiver.image ?
                                <img src='assets/images/user-12.png' alt='user' className='w-12 me-4' />
                                :
                                <div className='w-12 h-12 flex items-center justify-center rounded-full me-4 bg-gradient-to-r from-green-400 to-blue-400'>
                                    <span>{props.data.receiver.name[0]}</span>
                                </div>
                        }
                    </div>
                    <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>
                        {props.data?.receiver.name}
                    </h6>
                </div>

                <div className='email-text text-grey-500 fw-600 font-xssss'>
                    {lastMessageContent}
                </div>
                {
                    props.data.countNewMessage > 0 &&
                    <span className='flex items-center justify-center w-7 h-7 rounded-full bg-red-500'>
                        <span className="text-white font-bold">{props.data.countNewMessage}</span>
                    </span>
                }
                <div className='email-time text-grey-500 fw-600'>
                    {getConversationLastUpdate(props.data?.lastMessageSentAt ?? '')}
                </div>
            </Link>
        </li>
    )
}