import classNames from "classnames"
import axios from "axios"
import React, { useState, useEffect } from 'react';
import { SERVER_ADDRESS } from "../constants/SystemConstant";
import { FaEllipsisH } from "react-icons/fa";



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
      // console.log(res.data.data);
      setNotificationData(res.data.data)
    })
  }, [])

  const handleIsRead = () => {
    
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/all`, {
      userId: 12
    })
  }

  const notificationItems = (item: any) => {
    return (

      <div className='card bg-transparent-card w-100 mb-0 border-0 ps-0 ' style={{background: item.status === '0' ? '#f5f5f5' : '#fff', padding: 10, flexDirection: "row", width: 1000}}>
        <img src='/assets/images/user-8.png' alt='user' className='w70' style={{paddingLeft: 10}}/>
        <div style={{paddingLeft: 10, width: 250}}>
        <h5 className='font-xsss text-grey-900 fw-700 d-block mb-1 mt-1' style={{width: 230}}>
          Hanna 
        <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'> 3 min</span>
        </h5>
        <h6 className='text-grey-500 fw-500 font-xssss lh-4' style={{maxLines: 2}}>{(item.content).length > 50 ? `${item.content.substring(0, 50)}...` : item.content}</h6>
        </div>
        {/* <div style={{ position: 'absolute', width: 40, height: 35, borderRadius: 50, background: 'red' }}>

        <FaEllipsisH  />
        </div> */}
      </div>
    )
  }

  return (
    <div
      className={classNames('dropdown-menu notification-dropdown rounded-xxl right-0 border-0 p-4 shadow-lg', props.show ? 'show' : '')}
      aria-labelledby='dropdownMenu3'>
      <h4 className='fw-700 font-xss mb-2'>Notification</h4>
      <div className="mb-3">
      <button onClick={handleIsRead} style={{background: '#1e74fd', color: '#fff', borderRadius: 50, paddingTop: 3, paddingBottom: 3, paddingLeft: 10, paddingRight:10, fontSize: 13, fontWeight: 'bold'}}>Đánh dấu tất cả đã đọc</button>
      </div>
      {
        notificationData.map(notification => notificationItems(notification))
      }
    </div>
  )
}

