import { Fragment } from 'react'
import NotificationItem from '../items/NotificationItem'

export interface NotificationListViewProps {
  data: any
  handleItem: (id: number) => void
  handleIsNotRead: (id: number) => void
  handleDelNotification: (id: number) => void
  handleItemCanNotClick: (id: number) => void
}
export default function NotificationListView(props: NotificationListViewProps) {
  return (
    <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 700 }}>
      {props.data?.map((item: any, index: number) => (
        <Fragment key={index.toString()}>
          <NotificationItem
            id={item.id}
            status={item.status}
            type={item.type}
            userInteracted={item.userInteracted}
            dataValue={item.dataValue}
            createdAt={item.createdAt}
            content={item.content}
            handleItem={props.handleItem}
            handleIsNotRead={props.handleIsNotRead}
            handleDelNotification={props.handleDelNotification}
            handleItemCanNotClick={props.handleItemCanNotClick}
          />
        </Fragment>
      ))}
    </div>
  )
}
