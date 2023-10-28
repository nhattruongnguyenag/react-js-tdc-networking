import React from 'react'
import { Images } from '../../types/Images'

export interface CustomizeImageType {
  images: Images[]
}

const CustomizeImage = (props: CustomizeImageType) => {
  return (
    <>
      <div className='card-body d-block mb-3 p-0'>
        <div className='row pe-2 ps-2'>
          <div className='col-sm-12 p-1'>{JSON.stringify(props.images)}</div>
        </div>
      </div>
    </>
  )
}

export default CustomizeImage
