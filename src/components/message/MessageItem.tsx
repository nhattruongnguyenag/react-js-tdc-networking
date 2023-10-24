import classNames from "classnames"
import { Gallery } from "react-grid-gallery"
import { SERVER_ADDRESS } from "../../constants/SystemConstant"
import { Message } from "../../types/Message"

interface MessageItem {
    data: Message
    lastMessageRef?: React.LegacyRef<HTMLDivElement>
}

interface Image {
    src: string
    width: number
    height: number
}

const messageContent = (data: Message) => {
    if (data.type === 'plain/text') {
        return <div className='message-wrap'>{data.content}</div>
    }

    const images = data.content.split(',').map((url): Image => {
        return {
            src: url.startsWith('blob') ? url : SERVER_ADDRESS + 'api/images/' + url,
            width: 320,
            height: 220
        }
    })

    return <Gallery images={images} defaultContainerWidth={650} thumbnailStyle={{ width: 320 }} />
}

export default function MessageItem(props: MessageItem) {
    return (
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
                    <div className='time'>01:35 PM</div>
                </div>
            </div>
            {
                messageContent(props.data)
            }
        </div>
    )
}