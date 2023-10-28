import { Fragment } from 'react'
import Header from '../components/common/Header'

export default function SettingPage() {
  return (
    <Fragment>
      <Header />
      <div className='main-content bg-lightblue theme-dark-bg'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='middle-wrap'>
              <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                <div className='card-body p-lg-5 w-100 border-0 p-4'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <h4 className='font-xxl fw-700 mont-font mb-lg-5 font-md-xs mb-4 mb-4'>Settings</h4>
                      <div className='nav-caption fw-600 font-xssss text-grey-500 mb-2'>Genaral</div>
                      <ul className='list-inline mb-4'>
                        <li className='list-inline-item d-block border-bottom me-0'>
                          <a className='d-flex align-items-center pb-2 pt-2' href='/accountinformation'>
                            <i className='btn-round-md bg-primary-gradiant feather-home font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0'>Acount Information</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        <li className='list-inline-item d-block border-bottom me-0'>
                          <a className='d-flex align-items-center pb-2 pt-2' href='/contactinformation'>
                            <i className='btn-round-md bg-gold-gradiant feather-map-pin font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0'>Saved Address</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        <li className='list-inline-item d-block me-0'>
                          <a className='d-flex align-items-center pb-2 pt-2' href='/socialaccount'>
                            <i className='btn-round-md bg-red-gradiant feather-twitter font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0'>Social Acount</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                      </ul>
                      <div className='nav-caption fw-600 font-xsss text-grey-500 mb-2'>Acount</div>
                      <ul className='list-inline mb-4'>
                        <li className='list-inline-item d-block border-bottom me-0'>
                          <a className='d-flex align-items-center pb-2 pt-2' href='/payment'>
                            <i className='btn-round-md bg-mini-gradiant feather-credit-card font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0'>My Cards</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        <li className='list-inline-item d-block  me-0'>
                          <a className='d-flex align-items-center pb-2 pt-2' href='/password'>
                            <i className='btn-round-md bg-blue-gradiant feather-inbox font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0'>Password</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                      </ul>
                      <div className='nav-caption fw-600 font-xsss text-grey-500 mb-2'>Other</div>
                      <ul className='list-inline'>
                        <li className='list-inline-item d-block border-bottom me-0'>
                          <a className='d-flex align-items-center pb-2 pt-2' href='/defaultnoti'>
                            <i className='btn-round-md bg-gold-gradiant feather-bell font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0'>Notification</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        <li className='list-inline-item d-block border-bottom me-0'>
                          <a href='/helpbox' className='d-flex align-items-center pb-2 pt-2'>
                            <i className='btn-round-md bg-primary-gradiant feather-help-circle font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0'>Help</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        <li className='list-inline-item d-block me-0'>
                          <a href='/login' className='d-flex align-items-center pb-2 pt-2'>
                            <i className='btn-round-md bg-red-gradiant feather-lock font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0'>Logout</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
