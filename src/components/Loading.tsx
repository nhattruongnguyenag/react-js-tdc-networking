import React, { useState, useEffect, useRef } from 'react'
import '../style/loading.css'
import ReactLoading from 'react-loading'
import { BACKGROUND_BLUE } from '../constants/Color'

export default function Loading() {
  return (
    <div className='body'>
        <ReactLoading type='bubbles' color='rgb(16 91 131)' height={200} width={200} className='load'/>
    </div>
  )
}

