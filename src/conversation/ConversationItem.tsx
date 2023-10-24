import classNames from "classnames"
import { useCallback, useMemo } from "react"
import { Link } from "react-router-dom"
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
            <Link className='rounded-3 bg-lightblue theme-light-bg' to={'/nhan-tin'}>
                <div className='form-check mt-1'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        id='blankCheckbox1'
                        defaultValue='option1'
                    />
                    <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                </div>
                <div className='email-user'>
                    <span className={classNames('btn-round-xss me-2 ms-0',
                        props.data?.receiver.status ? 'bg-success' : '')} />
                    <img src='assets/images/user-12.png' alt='user' className='w35 me-2' />
                    <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>
                        {props.data?.receiver.name}
                    </h6>
                </div>
                <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                    <i className='feather-star font-xss text-warning me-2' />
                    Mobile App Design
                </div>
                <div className='email-text text-grey-500 fw-600 font-xssss'>
                    {lastMessageContent}
                </div>
                <span className='email-file'>
                    <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                </span>
                <div className='email-time text-grey-500 fw-600'>
                    {getConversationLastUpdate(props.data?.lastMessageSentAt ?? '')}
                </div>
            </Link>
        </li>
    )
}