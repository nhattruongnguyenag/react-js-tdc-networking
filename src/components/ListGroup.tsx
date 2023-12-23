import React, { memo, useEffect, useState } from 'react'
import CustomizeGroupItem from './group/CustomizeGroupItem'
import { useAppSelector } from '../redux/Hook'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import '../assets/css/group.css'

function ListGroup() {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [data, setData] = useState([])

  const renderItem = (item: any) => {
    return (
      <CustomizeGroupItem
        key={item.id.toString()}
        id={item.id}
        createAt={item.createdAt}
        active={item.active}
        background={item.background}
        name={item.name}
        code={item.code}
      />
    )
  }

  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + `api/users/${userLogin?.id}/group`)
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='nav-wrap bg-warning-card rounded-xxl mb-2 bg-white pb-1 pt-3 wrapper-group'>
      <div className='nav-caption fw-600 font-xssss text-grey-500'>
        <span>Nhóm của bạn</span>
      </div>
      <ul className='mb-3 pr-2'>{data?.map((item) => renderItem(item))}</ul>
    </div>
  )
}

export default memo(ListGroup)
