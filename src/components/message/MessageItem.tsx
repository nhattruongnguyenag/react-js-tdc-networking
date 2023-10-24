import classNames from "classnames"
import moment from "moment"
import { Fragment, useMemo, useRef, useState } from "react"
import { Gallery } from "react-grid-gallery"
import Lightbox from "react-image-lightbox"
import { SERVER_ADDRESS } from "../../constants/SystemConstant"
import { Message } from "../../types/Message"
import { getRandomInt } from "../../utils/CommonUtls"

interface MessageItem {
    data: Message
    lastMessageRef?: React.LegacyRef<HTMLDivElement>
}

interface Image {
    src: string
    width: number
    height: number
}

interface MessageContentProps {
    data: Message
}

const MessageContent = (props: MessageContentProps) => {
    if (props.data.type === 'plain/text') {
        return <div className='message-wrap'>{props.data.content}</div>
    }

    const images = props.data.content.split(',').map((url): Image => (
        {
            src: url.startsWith('blob') ? url : SERVER_ADDRESS + 'api/images/' + url,
            width: getRandomInt(480, 512),
            height: getRandomInt(290, 300)
        }
    ))

    const [index, setIndex] = useState(-1);
    const currentImage = useMemo(() => {
        return images[index]
    }, [index])
    const nextIndex = (index + 1) % images.length;
    const nextImage = images[nextIndex] || currentImage;
    const prevIndex = (index + images.length - 1) % images.length;
    const prevImage = images[prevIndex] || currentImage;

    const handleClick = (index: number, item: Image) => {
        setIndex(index)
    }
    const handleClose = () => {
        setIndex(-1)
    }
    const handleMovePrev = () => {
        setIndex(prevIndex)
    }
    const handleMoveNext = () => {
        setIndex(nextIndex)
    }


    return <div>
        <div className="flex-1">
            <Gallery
                onClick={handleClick}
                images={images}
                thumbnailStyle={{ cursor: 'pointer', alignItems: 'flex-end' }}
                enableImageSelection={false} />
        </div>

        {Boolean(currentImage) && (
            <Lightbox
                mainSrc={currentImage.src}
                mainSrcThumbnail={currentImage.src}
                nextSrc={nextImage.src}
                nextSrcThumbnail={nextImage.src}
                prevSrc={prevImage.src}
                prevSrcThumbnail={prevImage.src}
                onCloseRequest={handleClose}
                onMovePrevRequest={handleMovePrev}
                onMoveNextRequest={handleMoveNext}
            />
        )}
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