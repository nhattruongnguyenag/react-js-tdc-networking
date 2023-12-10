import React, { useState } from 'react'
import { Menu, MenuItem, MenuButton, ControlledMenu, useClick, useMenuState } from '@szhsin/react-menu'
import { FaEllipsisV, FaBullhorn, FaTimes, FaTablet } from 'react-icons/fa'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { Default } from 'react-toastify/dist/utils'
import DefaultAvatar from '../common/DefaultAvatar'

export interface UserItemProps {
  id: any
  image: string
  name: string
  isFollow: boolean
  handleFollow: (userId: number) => void
}
export default function UserItem(props: UserItemProps) {
  let item = props

  const isFollowed = () => {
    return (
      <Menu
        menuButton={
          <MenuButton style={{ width: 30, height: 50, borderRadius: 30 }}>
            <FaEllipsisV style={{ position: 'absolute', fontSize: 17, marginLeft: 7 }} />
          </MenuButton>
        }
        transition
      >
        <MenuItem onClick={() => null}>
          <FaBullhorn style={{ marginRight: 20 }} />
          Trang cá nhân
        </MenuItem>
        <MenuItem onClick={() => item.handleFollow(item.id)}>
          <FaTimes style={{ marginRight: 20 }} />
          Hủy theo dõi
        </MenuItem>
      </Menu>
    )
  }
  // handleFollow(item.id)
  const isNotFollow = () => {
    return (
      <button
        type='button'
        className='btn btn-outline-primary text-dark'
        style={{ width: 150, fontSize: 13 }}
        onClick={() => item.handleFollow(item.id)}
      >
        Theo dõi
      </button>
    )
  }

  // 'card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4
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
      /> : <div style={{marginLeft: 30,
        marginRight: 20,}}><DefaultAvatar name={item.name} size={65} styleBootstrap={undefined}/></div>
      }
      
      <div className='name' style={{ width: '50%' }}>
        <p style={{ fontSize: 17, fontWeight: 'bold' }}>{item.name}</p>
      </div>
      <div style={{ position: 'absolute', right: 0, marginRight: 30 }}>
        {item.isFollow ? isFollowed() : isNotFollow()}
      </div>
    </div>
  )
}
