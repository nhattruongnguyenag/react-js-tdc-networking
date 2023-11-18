import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useAppSelector } from '../../redux/Hook'
import { forEachChild } from 'typescript'

export interface GroupItem {
  id: any
  createAt: string
  active: number
  background: string
  name: string
  code: string
}

function CustomizeGroupItem(props: GroupItem) {
  const imgSrc = SERVER_ADDRESS + 'api/images/' + props.background
  return (
    <li>
      <a className='nav-content-bttn open-font group' href='/defaultemailbox'>
        <div className='wrapper-image'>
          <img className='feather-inbox img-group me-3' src={imgSrc}/>
        </div>

        <div className='wrapper-name'>
          <span className='text-group'>{props.name}</span>
        </div>
      </a>
    </li>
  )
}

export default memo(CustomizeGroupItem)