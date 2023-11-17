import React, { useState } from 'react'
import { Menu, MenuItem, MenuButton, ControlledMenu, useClick, useMenuState } from '@szhsin/react-menu'
import { FaEllipsisV, FaBullhorn, FaTimes, FaTablet } from 'react-icons/fa'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../common/DefaultAvatar'

export interface UserItemProps {
  id: any
  image: string
  name: string
  isFollow: boolean
}
export default function ItemUserFollower(props: UserItemProps) {
  let item = props
  return (
    <div
      className='card shadow-xs mb-2 border-0 bg-white p-4'
      style={{ flexDirection: 'row', height: 90, alignItems: 'center' }}
    >
      {
        item.image ? <img
          style={{
            width: 65,
            height: 65,
            marginLeft: 30,
            marginRight: 20,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: 'primary',
            backgroundSize: 'cover'
          }}
          src={SERVER_ADDRESS + 'api/images/' + item.image}
        /> : <div style={{
          marginLeft: 30,
          marginRight: 20,
        }}><DefaultAvatar name={item.name} size={65} styleBootstrap={undefined} /></div>
      }
      <div className='name' style={{ width: '50%' }}>
        <p style={{ fontSize: 17, fontWeight: 'bold' }}>{item.name}</p>
      </div>
    </div>
  )
}
