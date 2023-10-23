import { Fragment } from 'react'
import Header from '../components/common/Header'

export default function ConversationPage() {
  return (
    <Fragment>
      <Header />
      <div className='main-content right-chat-active'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left ps-lg-3 me-0 ms-0 pe-0' style={{ maxWidth: '100%' }}>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='chat-wrapper w-100 position-relative scroll-bar theme-dark-bg bg-white p-3'>
                  <ul className='email-message'>
                    <li>
                      <a className='rounded-3 bg-lightblue theme-light-bg' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-12.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Hurin Seary</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <span className='email-file'>
                          <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                        </span>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 ' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-11.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Victor Exrixon</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 ' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-8.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Surfiya Zakir</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <span className='email-file'>
                          <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                        </span>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 bg-lightblue theme-light-bg' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-7.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Goria Coast</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 bg-lightblue theme-light-bg' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-12.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Hurin Seary</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 ' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-11.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>David Goria</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <span className='email-file'>
                          <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                        </span>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 ' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-8.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Seary Victor</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <span className='email-file'>
                          <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                        </span>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 bg-lightblue theme-light-bg' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-7.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Ana Seary</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <span className='email-file'>
                          <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                        </span>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 bg-lightblue theme-light-bg' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-7.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Aliqa Macale</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 bg-lightblue theme-light-bg' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-12.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Aliqa Macale</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 ' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-11.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Aliqa Macale</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <span className='email-file'>
                          <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                        </span>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 ' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-8.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Aliqa Macale</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <span className='email-file'>
                          <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                        </span>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                    <li>
                      <a className='rounded-3 bg-lightblue theme-light-bg' href='/defaultemailopen'>
                        <div className='form-check mt-1'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='blankCheckbox1'
                            defaultValue='option1'
                          />
                          <label className='text-grey-500 font-xssss' htmlFor='blankCheckbox1' />
                        </div>
                        <div className='email-user'>
                          <span className='btn-round-xss bg-success me-2 ms-0' />
                          <img src='assets/images/user-7.png' alt='user' className='w35 me-2' />
                          <h6 className='font-xssss text-grey-900 text-grey-900 fw-700 mb-0 mt-0'>Aliqa Macale</h6>
                        </div>
                        <div className='email-subject text-grey-900 text-dark fw-600 font-xssss'>
                          <i className='feather-star font-xss text-warning me-2' />
                          Mobile App Design
                        </div>
                        <div className='email-text text-grey-500 fw-600 font-xssss'>
                          Hey Cak, Could you free now? Can you look and read the brief first before.
                        </div>
                        <span className='email-file'>
                          <i className='feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0' />
                        </span>
                        <div className='email-time text-grey-500 fw-600'>12:45 PM</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
