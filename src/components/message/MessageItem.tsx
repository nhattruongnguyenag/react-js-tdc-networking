import classNames from "classnames"
import moment from "moment"
import { Fragment, useMemo, useRef, useState } from "react"
import { SERVER_ADDRESS } from "../../constants/SystemConstant"
import { Message } from "../../types/Message"
import { getRandomInt } from "../../utils/CommonUtls"
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import { getMessageSectionTitle } from "../../utils/DateTimeUtils"

interface MessageItemProps {
    data: Message
    lastMessageRef?: React.LegacyRef<HTMLDivElement>
    headerVisible?: boolean
}

interface Image {
    original: string
    thumbnail: string
    src: string
    width: string
    height: string
}

interface MessageContentProps {
    data: Message
}

const MessageContent = (props: MessageContentProps) => {
    if (props.data.type === 'plain/text') {
        return <div className='message-wrap'>{props.data.content}</div>
    }

    const smallItemStyles: React.CSSProperties = {
        cursor: 'pointer',
        objectFit: 'cover',
        width: '640px'
    }

    const images: Image[] = props.data.content.split(',').map((item, index) => ({
        original: SERVER_ADDRESS + 'api/images/' + item,
        thumbnail: SERVER_ADDRESS + 'api/images/' + item,
        src: SERVER_ADDRESS + 'api/images/' + item,
        width: '1080',
        height: '960'
    }))

    let gridTemplateColumns = '320px 320px'

    if (images.length === 1) {
        gridTemplateColumns = '480px'
    }

    return <div>
        <Gallery>
            <div style={{
                display: 'grid',
                gridAutoRows: '',
                objectFit: 'cover',
                gridTemplateColumns: gridTemplateColumns,
                gridTemplateRows: 'auto',
                gridGap: 5,
            }}>
                {
                    images.map((item, index) => (
                        <Item
                            original={item.original}
                            thumbnail={item.thumbnail}
                            width={item.width}
                            height={item.height}
                        >
                            {({ ref, open }) => (
                                <img
                                    style={smallItemStyles}
                                    ref={ref as React.LegacyRef<HTMLImageElement>}
                                    onClick={open}
                                    src={item.src} />
                            )}
                        </Item>
                    ))
                }
            </div>
        </Gallery>
    </div>
}

export default function MessageItem(props: MessageItemProps) {
    return (
        <Fragment>
            {
                Boolean(props.headerVisible)
                && <div className="ms-auto me-auto text-center pt-1 pb-1 mt-16 mb-16 rounded-full border-2 w-2/3 border-gray-400">
                    {getMessageSectionTitle(props.data.createdAt)}
                </div>
            }
            <div
                ref={props.lastMessageRef}
                className={classNames('message-item',
                    props.data.sender.id === 1 ? 'outgoing-message' : '')}>
                <div className='message-user'>
                    <figure className='avatar mb-2 mt-2'>
                        {
                            props.data.receiver.image ?
                                <img src='assets/images/user-12.png' alt='user' className='w-12 me-2' />
                                :
                                <div className={classNames('w-12 h-12 flex items-center justify-center me-2 rounded-full bg-gradient-to-r',
                                    props.data.sender.id === 1 ? 'from-purple-400 to-blue-400' : 'from-green-400 to-blue-400'
                                )}>
                                    <span>{props.data.receiver.name[0]}</span>
                                </div>
                        }
                    </figure>
                    <div>
                        <h5>{props.data.sender.name}</h5>
                        <div className='time'>{moment(props.data.createdAt).format('hh:mm a')}</div>
                    </div>
                </div>
                {
                    <MessageContent data={props.data} />
                }
                <div className="ms-1 mt-2">{props.data.status === 0 ? "Đã nhận" : "Đã xem"}</div>
            </div>
        </Fragment>
    )
}