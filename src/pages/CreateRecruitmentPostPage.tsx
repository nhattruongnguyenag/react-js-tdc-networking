import React from 'react'
import Header from '../components/common/Header'

export default function CreateRecruitmentPostPage() {
  return <>
    <Header />
    <div className='main-content'>
      <div className='middle-wrap'>
        <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
          <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
            <a className='d-inline-block mt-2' href='/defaultsettings'>
              <i className='ti-arrow-left font-sm text-white' />
            </a>
            <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Change Password</h4>
          </div>
          <div className='card-body p-lg-5 w-100 border-0 p-4'>
            <form action='#'>
              <div className='row'>
                <div className='col-lg-12 mb-3'>
                  <div className='form-gorup'>
                    <label className='mont-font fw-600 font-xssss text-dark'>Current Password</label>
                    <input type='text' name='comment-name' className='form-control' />
                  </div>
                </div>
                <div className='col-lg-12 mb-3'>
                  <div className='form-gorup'>
                    <label className='mont-font fw-600 font-xssss text-dark'>Change Password</label>
                    <input type='text' name='comment-name' className='form-control' />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-12 mb-3'>
                  <div className='form-gorup'>
                    <label className='mont-font fw-600 font-xssss text-dark'>Confirm Change Password</label>
                    <input type='text' name='comment-name' className='form-control' />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-12 mb-0'>
                  <a
                    href='/password'
                    className='font-xsss fw-600 w175 rounded-3 d-inline-block bg-current p-3 text-center text-white'
                  >
                    Save
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}
