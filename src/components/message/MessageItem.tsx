import classNames from 'classnames'
import { url } from 'inspector'
import moment from 'moment'
import 'photoswipe/dist/photoswipe.css'
import { Fragment } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'
import { MESSAGE_ITEM_STATUS_RECEIVED, MESSAGE_ITEM_STATUS_SEEN, MESSAGE_SENDING_STATUS } from '../../constants/StringVietnamese'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useAppSelector } from '../../redux/Hook'
import { Message } from '../../types/Message'
import { getUserLogin } from '../../utils/CommonUtls'
import { getMessageSectionTitle } from '../../utils/DateTimeUtils'

interface MessageItemProps {
  data: Message
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
    original: item.startsWith('blob') ? item : SERVER_ADDRESS + 'api/images/' + item,
    thumbnail: item.startsWith('blob') ? item : SERVER_ADDRESS + 'api/images/' + item,
    src: item.startsWith('blob') ? item : SERVER_ADDRESS + 'api/images/' + item,
    width: '1080',
    height: '960'
  }))

  let gridTemplateColumns = '320px 320px'

  if (images.length === 1) {
    gridTemplateColumns = '480px'
  }

  return (
    <div>
      <Gallery>
        <div
          style={{
            display: 'grid',
            gridAutoRows: '',
            objectFit: 'cover',
            gridTemplateColumns: gridTemplateColumns,
            gridTemplateRows: 'auto',
            gridGap: 5
          }}
        >
          {images.map((item, index) => (
            <Item original={item.original} thumbnail={item.thumbnail} width={item.width} height={item.height}>
              {({ ref, open }) => (
                <img
                  style={smallItemStyles}
                  ref={ref as React.LegacyRef<HTMLImageElement>}
                  onClick={open}
                  src={item.src}
                />
              )}
            </Item>
          ))}
        </div>
      </Gallery>
    </div>
  )
}

export default function MessageItem(props: MessageItemProps) {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  let messageStatus = MESSAGE_SENDING_STATUS

  if (props.data.status === 0) {
    messageStatus = MESSAGE_ITEM_STATUS_RECEIVED
  } else if (props.data.status === 1) {
    messageStatus = MESSAGE_ITEM_STATUS_SEEN
  }

  return (
    <Fragment>
      {Boolean(props.headerVisible) && (
        <div className='mb-16 me-auto ms-auto mt-16 w-2/3 rounded-full border-2 border-gray-400 pb-1 pt-1 text-center'>
          {getMessageSectionTitle(props.data.createdAt)}
        </div>
      )}
      <div className={classNames('message-item', props.data.sender.id === userLogin?.id ? 'outgoing-message' : '')}>
        <div className='message-user'>
          <figure className='avatar mb-2 mt-2'>
            {props.data.receiver.image ? (
              <img src='assets/images/user-12.png' alt='user' className='me-2 w-12' />
            ) : (
              <div
                className={classNames(
                  'me-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r',
                  props.data.sender.id === userLogin?.id ? 'from-purple-400 to-blue-400' : 'from-green-400 to-blue-400'
                )}
              >
                <span>{props.data.receiver.name[0]}</span>
              </div>
            )}
          </figure>
          <div>
            <h5>{props.data.sender.name}</h5>
            <div className='time'>{moment(props.data.createdAt).format('hh:mm a')}</div>
          </div>
        </div>
        {<MessageContent data={props.data} />}
        <div className={classNames('ms-1 mt-2', props.data.sender.id !== userLogin?.id ? 'hidden' : '')}>
          {messageStatus}
        </div>
      </div>
    </Fragment>
  )
}
