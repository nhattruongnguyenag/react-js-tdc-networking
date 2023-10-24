import classNames from "classnames"
import axios from "axios"
import React, { useState, useEffect, useRef } from 'react';
import { SERVER_ADDRESS } from "../constants/SystemConstant";
import '../style/notification.css';
import { FaEllipsisV, FaBullhorn, FaTimes, FaTablet } from "react-icons/fa";
import { Menu, MenuItem, MenuButton, ControlledMenu, useClick, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Moment from 'react-moment';
import moment from 'moment';
interface NotificationPopupProps {
  show?: boolean
}


export default function NotificationPopup(props: NotificationPopupProps) {
  const [notificationData, setNotificationData] = useState([])


  useEffect(() => {
    axios.post(`${SERVER_ADDRESS}api/notifications/user`, {
      id: 12
    })
      .then(res => {
        setNotificationData(res.data.data)
      })
  }, [])

  const handleAllIsRead = () => {
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/all`, {
      userId: 12
    })
  }

  const handleIsRead = (id: number) => {
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus`, {
      id: id,
      userId: 12,
    })
  }

  const handleIsNotRead = (id: number) => {
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/makeNotSeen`, {
      id: id,
      userId: 12,
    })
  }

  const handleDelNotification = (id: number) => {
    axios.delete(`${SERVER_ADDRESS}api/notifications`, {
      data: {
        id: id,
        userId: 12,
      }
    })
  }


  const time = (props: any) => {
    // const fromNow = moment(item.createdAt).fromNow();
    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     fromNow = (moment(item.createdAt).fromNow());
    //   }, 60000); // Cập nhật mỗi phút

    //   return () => {
    //     clearInterval(intervalId);
    //   };
    // }, [item.createdAt]);
  }
  // function Time(props) {

  // }

  const notificationItems = (item: any) => {
    // const setTime = () => {
    //   useEffect(() => {
        



    //     const fromNow = moment(item.createdAt).fromNow();
    //     const intervalId = setInterval((fromNow) => {
    //       fromNow = (moment(item.createdAt).fromNow());
    //     }, 60000); // Cập nhật mỗi phút

    //     return () => {
    //       clearInterval(intervalId);
    //     };
    //   }, [item.createdAt]);
    // }

    return (
      <div
        className='card bg-transparent-card w-100 mb-0 border-0 ps-0 itemNotification'
        style={{ background: item.status === '0' ? '#f5f5f5' : '#fff', flexDirection: "row", padding: 10 }}
        onClick={() => handleIsRead(item.id)}
      >
        <img src='/assets/images/user-8.png' alt='user' style={{ width: 60, height: 60, marginLeft: 10 }} />
        <div style={{ paddingLeft: 10, width: 250 }}>
          <h5 className='font-xsss text-grey-900 fw-700 d-block mb-1 mt-1' style={{ width: 225 }}>
            Hanna
            <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'>{moment(item.createdAt).fromNow()}</span>
          </h5>
          <h6 className='text-grey-500 fw-500 font-xssss lh-4' style={{ maxLines: 2 }}>
            {(item.content).length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
          </h6>
        </div>
        <Menu menuButton={<MenuButton style={{ width: 30, height: 50, borderRadius: 30 }}>
          <FaEllipsisV style={{ position: 'absolute', fontSize: 17, marginLeft: 7 }} />
        </MenuButton>} transition>
          <MenuItem onClick={() => handleIsNotRead(item.id)}>
            <FaBullhorn style={{ marginRight: 20 }} />Đánh dấu chưa đọc
          </MenuItem>
          <MenuItem onClick={() => handleDelNotification(item.id)}>
            <FaTimes style={{ marginRight: 20 }} />Xóa thông báo
          </MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <div
      className={classNames('dropdown-menu notification-dropdown rounded-xxl right-0 border-0 p-4 shadow-lg', props.show ? 'show' : '')}
      aria-labelledby='dropdownMenu3'
    >
      <h4 className='fw-700 font-xss mb-2'>Notification</h4>
      <div className="mb-3">
        <button onClick={handleAllIsRead} style={{ background: '#1e74fd', color: '#fff', borderRadius: 50, paddingTop: 3, paddingBottom: 3, paddingLeft: 10, paddingRight: 10, fontSize: 13, fontWeight: 'bold' }}>Đánh dấu tất cả đã đọc</button>
      </div>
      <div className="position-relative scroll-bar theme-dark-bg bg-white pt-0" style={{ height: 700 }}>
        {
          notificationData.map(notification => notificationItems(notification))
        }
      </div>
    </div>
  )
}
<style>
</style>
