import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/common/Header'
import InputTextWithTitle from '../components/common/InputTextWithTitle'
import TextAreaWithTitle from '../components/common/TextAreaWithTitle'
import { BUSINESS_DASHBOARD_PAGE } from '../constants/Page'

export default function CreateRecruitmentPostPage() {
  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-wrap'>
          <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
            <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
              <Link className='d-inline-block mt-2' to={BUSINESS_DASHBOARD_PAGE}>
                <i className='ti-arrow-left font-sm text-white' />
              </Link>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Thêm tin tuyển dụng</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-4'>
              <div className='row'>
                <InputTextWithTitle
                  title='Tên công việc'
                  placeholder={'Nhập tên công việc...'} />

                <InputTextWithTitle title='Hình thức làm việc'
                  placeholder={'Nhập hình thức làm việc...'} />
                <InputTextWithTitle title='Thời hạn ứng tuyển'
                  type='datetime-local'
                  placeholder={'Nhập thời hạn ứng tuyển...'} />
                <TextAreaWithTitle
                  rows={5}
                  placeholder='Nhập địa điểm làm việc...'
                  title='Địa điểm làm việc' />
                <TextAreaWithTitle
                  rows={10}
                  placeholder={'Nhập địa điểm làm việc...'}
                  title='Mô tả công việc' />
                <InputTextWithTitle title='Lương'
                  placeholder={'Nhập mức lương...'} />
                <TextAreaWithTitle
                  rows={10}
                  placeholder={'Nhập yêu cầu...'}
                  title='Yêu cầu' />
                <TextAreaWithTitle
                  rows={20}
                  placeholder={'Nhập quyền lợi...'}
                  title='Quyền lợi' />
              </div>
              <div className='row'>
                <div className='col-lg-12 mb-0'>
                  <a
                    href='/password'
                    className='font-xsss fw-600 w175 rounded-3 d-inline-block bg-current p-3 text-center text-white'
                  >
                    Đăng bài viết
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
