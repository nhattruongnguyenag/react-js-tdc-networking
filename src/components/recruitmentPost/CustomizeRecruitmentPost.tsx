import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapLocation,
  faClock,
  faMoneyCheckDollar,
  faBriefcase,
  faAnglesRight
} from '@fortawesome/free-solid-svg-icons'
import { COLOR_GREY, COLOR_WHITE } from '../../constants/Color'

export interface RecruitmentPostType {
  id: number,
  typeAuthor: string | null,
  role: string,
  createdAt: string,
  image: string,
  name: string,
  type: string,
  location: string,
  title: string,
  expiration: string,
  salary: string,
  employmentType: string,
  textButtonSeeDetail: string,
  handleClickBtnSeeDetailEvent: (id: number, title: string) => void
}

export default function CustomizeRecruitmentPost(props: RecruitmentPostType) {
  return (
    <div className='row pb-2 pt-3'>
      <div className='col-md-1'></div>
      <div className='col-md-11'>
        <div className='wrapper-infor-job'>
          <div className='text-location-body-recruitment text-grey-900 text-dark'>
            <FontAwesomeIcon icon={faMapLocation} size='1x' color={COLOR_GREY} className='icon-location-recruitment' />
            <div className='textLocationRecruitment'>{props.location}</div>
          </div>
          <div className='wrapperContentRecruitment'>
            <p className='textLocationRecruitment' color={COLOR_GREY}>{props.title}</p>
          </div>
          {/*  */}
          <div className='list-infor-about-recruitment text-grey-900 text-dark'>
            <div className='icon-item-infor-job-recruitment'>
              <FontAwesomeIcon icon={faClock} size='1x' color={COLOR_GREY} className='icon-location-recruitment' />
              <div className='txt-item-recruitment textLocationRecruitment'>{props.expiration}</div>
            </div>
            <div className='icon-item-infor-job-recruitment'>
              <FontAwesomeIcon icon={faMoneyCheckDollar} size='1x' color={COLOR_GREY} className='icon-location-recruitment' />
              <div className='txt-item-recruitment textLocationRecruitment'>{props.salary} vnd</div>
            </div>
            <div className='icon-item-infor-job-recruitment'>
              <FontAwesomeIcon icon={faBriefcase} size='1x' color={COLOR_GREY} className='icon-location-recruitment' />
              <div className='txt-item-recruitment textLocationRecruitment'>{props.employmentType}</div>
            </div>
          </div>
          <div className='pt-3'>
            <button
              onClick={() => props.handleClickBtnSeeDetailEvent(props.id, props.title)}
              className='bg-primary-gradiant button-see-more-recruitment textLocationRecruitment'
            >
              {props.textButtonSeeDetail}
              <FontAwesomeIcon icon={faAnglesRight} size='1x' color={COLOR_WHITE} className='icon-arrow-left' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
