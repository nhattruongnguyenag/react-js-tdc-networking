import classNames from "classnames"
import moment from "moment"
import { Fragment, useMemo, useRef, useState } from "react"
import { SERVER_ADDRESS } from "../../constants/SystemConstant"
import { Message } from "../../types/Message"
import { getRandomInt } from "../../utils/CommonUtls"
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

interface MessageItem {
    data: Message
    lastMessageRef?: React.LegacyRef<HTMLDivElement>
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

export default function MessageItem(props: MessageItem) {
    return (
        <Fragment>
            <div
                ref={props.lastMessageRef}
                className={classNames('message-item',
                    props.data.sender.id === 1 ? 'outgoing-message' : '')}>
                <div className='message-user'>
                    <figure className='avatar'>
                        <img src='assets/images/user-9.png' alt='avater' />
                    </figure>
                    <div>
                        <h5>{props.data.sender.name}</h5>
                        <div className='time'>{moment(props.data.createdAt).format('hh:mm a')}</div>
                    </div>
                </div>
                {
                    <MessageContent data={props.data} />
                }
            </div>
        </Fragment>
    )
}