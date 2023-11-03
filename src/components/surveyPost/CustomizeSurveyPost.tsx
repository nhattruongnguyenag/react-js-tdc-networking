import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { COLOR_WHITE } from '../../constants/Color'

export interface RecruitmentPostType {
  id: number,
  role: string,
  createdAt: string,
  typeAuthor: string,
  image: string,
  name: string,
  type: string,
  title: string,
  description: string,
  handleClickBtnSeeDetailEvent: (id: number) => void
}

export default function CustomizeSurveyPost(props: RecruitmentPostType) {
  return (
    <div>
      <p className='content-container fw-500 text-black-500 lh-26 font-xssss w-100 mb-1'>
        {
          props.title
        }
      </p>
      <p className='content-container fw-500 text-grey-500 lh-26 font-xssss w-100 mb-1'>
        {
          props.description
        }
      </p>
      <div className='pt-2 pb-2'>
        <button
          onClick={() => props.handleClickBtnSeeDetailEvent(props.id)}
          className='bg-primary-gradiant button-see-more-recruitment'
        >
          Xem chi tiết
          <FontAwesomeIcon icon={faAnglesRight} size='1x' color={COLOR_WHITE} className='icon-arrow-left' />
        </button>
      </div>
    </div>
  )
}
