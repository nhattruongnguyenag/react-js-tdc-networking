import classNames from 'classnames'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import '../assets/css/notification.css'
import { FaEllipsisV, FaBullhorn, FaTimes, FaTablet } from 'react-icons/fa'
import { Menu, MenuItem, MenuButton, ControlledMenu, useClick, useMenuState } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import Moment from 'react-moment'
import moment from 'moment'
import { NotificationModel } from '../types/response/NotificationModel'
import { useGetNotificationsUserByIdQuery } from '../redux/Service'
import { useAppSelector } from '../redux/Hook'
import { useTranslation } from 'react-multi-lang'
import NotificationListView from './listviews/NotificationListView'
interface NotificationPopupProps {
  show?: boolean
}

export default function NotificationPopup(props: NotificationPopupProps) {
  const t = useTranslation()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const { data, isFetching } = useGetNotificationsUserByIdQuery(
    {
      id: userLogin?.id ?? -1
    },
    {
      pollingInterval: 1000
    }
  )
  const [arr, setArr] = useState<NotificationModel[]>()

  useEffect(() => {
    // setIsLoading(false)
    setArr(data?.data)
  }, [isFetching])

  const handleAllIsRead = () => {
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/all`, {
      userId: userLogin?.id ?? -1
    })
  }

  const handleItem = (id: number) => {
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus`, {
      id: id,
      userId: userLogin?.id ?? -1
    })
  }
  //Danh dau chua doc
  const handleIsNotRead = (id: number) => {
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/makeNotSeen`, {
      id: id,
      userId: userLogin?.id ?? -1
    })
  }

  const handleDelNotification = (id: number) => {
    axios.delete(`${SERVER_ADDRESS}api/notifications`, {
      data: {
        id: id,
        userId: userLogin?.id ?? -1
      }
    })
  }

  const notificationItems = (item: NotificationModel) => {
    return (
      <div
        key={item.id}
        className='card bg-transparent-card w-100 itemNotification mb-0 border-0 ps-0'
        style={{ background: item.status == '0' ? '#e6e6e6' : '#fff', flexDirection: 'row', padding: 10 }}
        onClick={() => handleItem(item.id)}
      >
        <img src='/assets/images/user-8.png' alt='user' className='image_item' />
        <div className='content_item'>
          <h5 className='text-grey-900 fw-500 font-xsss lh-4 txt_content' >
            Lorem
            {/* {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content} */}
          </h5>
          <h6 className='font-xssss text-grey-500 fw-500 d-block mb-1 mt-1 txt_name'>
            {moment(item.createdAt).fromNow()}
          </h6>
        </div>
        <Menu
          menuButton={
            <MenuButton className='menu_btn '>
              <FaEllipsisV />
            </MenuButton>
          }
          transition
        >
          <MenuItem onClick={() => handleIsNotRead(item.id)}>
            <FaBullhorn className='icon_option' />
            {t('NotificationsComponent.unReadNotification')}
          </MenuItem>
          <MenuItem onClick={() => handleDelNotification(item.id)}>
            <FaTimes className='icon_option' />
            {t('NotificationsComponent.deleteNotification')}
          </MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'dropdown-menu notification-dropdown rounded-xxl right-0 border-0 p-4 shadow-lg ',
        props.show ? 'show' : ''
      )}
      aria-labelledby='dropdownMenu3'
    >
      <h4 className='fw-700 font-xss mb-2 title_notification'>{t('NotificationsComponent.notification')}</h4>
      <div className='mb-3'>
        <button
          onClick={handleAllIsRead}
          style={{
            background: '#1e74fd',
            color: '#fff',
            borderRadius: 50,
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 13,
            marginLeft: 10,
            fontWeight: 'bold'
          }}
        >
          {t('NotificationsComponent.readAll')}
        </button>
      </div>
      <NotificationListView
        data={arr}
        handleItem={handleItem}
        handleDelNotification={handleDelNotification}
        handleIsNotRead={handleIsNotRead}
      // handleItemCanNotClick={handleItemCanNotClick} 
      />
    </div>
  )
} 
