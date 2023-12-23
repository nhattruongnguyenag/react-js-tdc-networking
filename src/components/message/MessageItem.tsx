import classNames from 'classnames'
import { url } from 'inspector'
import moment from 'moment'
import 'photoswipe/dist/photoswipe.css'
import { Fragment } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'
import { IMAGE_URL } from '../../constants/Path'
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
          className='border'
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
            <Item key={index.toString()} original={item.original} thumbnail={item.thumbnail} width={item.width} height={item.height}>
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
        <h6 className='mb-16 me-auto ms-auto mt-16 w-2/3 rounded-full border-2 border-gray-400 pb-1 pt-1 text-center'>
          {getMessageSectionTitle(props.data.createdAt)}
        </h6>
      )}

      <div className={classNames('message-item', props.data.sender.id === userLogin?.id ? 'outgoing-message' : '')}>
        <div className={classNames('flex flex-row', props.data.sender.id === userLogin?.id ? 'justify-end': 'justify-start')}>
          <figure className=''>
            {props.data.receiver.image ? (
              <img
                src={IMAGE_URL + props.data.receiver.image}
                alt='user'
                className='me-2 h-12 w-12 rounded-full object-cover'
              />
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
            <h5 className='text-sm'>{props.data.sender.name}</h5>
            <div>
              <h6 className='text-sm'>{moment(props.data.createdAt).format('hh:mm a')}</h6>
            </div>
          </div>
        </div>
        {<MessageContent data={props.data} />}
        <h6 className={classNames('ms-1 mt-2 text-sm text-gray-600', props.data.sender.id !== userLogin?.id ? 'hidden' : '')}>
          {messageStatus}
        </h6>
      </div>
    </Fragment>
  )
}
