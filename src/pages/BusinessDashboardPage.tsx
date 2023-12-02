import { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { numberDayPassed } from '../utils/FormatTime'
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton'
import { useGetBusinessPostsQuery } from '../redux/Service'
import { LikeAction } from '../types/LikeActions'
import { Post } from '../types/Post'
import { handleDataClassification } from '../utils/DataClassfications'
import { TYPE_POST_BUSINESS } from '../constants/StringVietnamese'
import CustomizePost from '../components/post/CustomizePost'
import CreatePostSelector from '../components/CreatePostSelector'
import { useAppSelector } from '../redux/Hook'

export default function BusinessDashboardPage() {
  const code = 'group_connect_business'
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post[]>([]);
  const { data, isFetching } = useGetBusinessPostsQuery(
    { id: userLogin?.id ?? 0 },
    {
      pollingInterval: 500
    }
  );
  useEffect(() => {
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setPost([]);
      const tempPost = handleDataClassification(data, TYPE_POST_BUSINESS);
      setPost(tempPost);
    }
  }, [data])

  const likeAction = (obj: LikeAction) => {
  }
  const handleUnSave = () => {
  }

  const renderItem = (item: any) => {
    return (
      <CustomizePost
        key={item.id}
        id={item.id}
        userId={item.user['id']}
        name={item.user['name']}
        avatar={item.user['image']}
        typeAuthor={TYPE_POST_BUSINESS}
        available={null}
        timeCreatePost={numberDayPassed(item.createdAt)}
        content={item.content}
        type={item.type}
        likes={item.likes}
        comments={item.comment}
        commentQty={item.commentQuantity}
        images={item.images}
        role={item.user['roleCodes']}
        likeAction={likeAction}
        location={item.location ?? null}
        title={item.title ?? null}
        expiration={item.expiration ?? null}
        salary={item.salary ?? null}
        employmentType={item.employmentType ?? null}
        description={item.description ?? null}
        isConduct={item.isConduct ?? null}
        isSave={item.isSave}
        group={code}
        handleUnSave={handleUnSave}
      />
    )
  }
  return (
    <>
      <Header />
      <div id='main-content-wrap' className='right-chat nav-wrap right-scroll-bar mt-2'>
        <div className='middle-sidebar-right-content shadow-xss rounded-xxl bg-white'>
          <div className='section full position-relative feed-body pe-3 ps-4 pt-4'>
            <h4 className='font-xsssss text-grey-500 text-uppercase fw-700 ls-3'>CONTACTS</h4>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-8.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Hurin Seary
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-7.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Victor Exrixon
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-6.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Surfiya Zakir
                  </span>
                </h3>
                <span className='bg-warning btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-5.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Goria Coast
                  </span>
                </h3>
                <span className='bg-danger btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-4.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Hurin Seary
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-3.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    David Goria
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-2.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Seary Victor
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-12.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>Ana Seary</span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
            </ul>
          </div>
          <div className='section full position-relative feed-body pb-4 pe-3 ps-4 pt-4'>
            <h4 className='font-xsssss text-grey-500 text-uppercase fw-700 ls-3'>GROUPS</h4>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-primary-gradiant ls-3 font-xssss fw-700 me-3 text-white'>UD</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Studio Express
                  </span>
                </h3>
                <span className='badge text-grey-500 badge-pill font-xsssss mt-0 pe-0'>2 min</span>
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-gold-gradiant ls-3 font-xssss fw-700 me-3 text-white'>AR</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Armany Design
                  </span>
                </h3>
                <span className='bg-warning btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-mini-gradiant ls-3 font-xssss fw-700 me-3 text-white'>UD</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>De fabous</span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
            </ul>
          </div>
          <div className='section full position-relative feed-body pb-4 pe-3 ps-4 pt-0'>
            <h4 className='font-xsssss text-grey-500 text-uppercase fw-700 ls-3'>Pages</h4>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-primary-gradiant ls-3 font-xssss fw-700 me-3 text-white'>AB</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Armany Seary
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-gold-gradiant ls-3 font-xssss fw-700 me-3 text-white'>SD</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Entropio Inc
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
            </ul>
          </div>
        </div>
        <div className='modal-popup-chat '>
          <div className='modal-popup-wrap rounded-3 bg-white p-0 shadow-lg'>
            <div className='modal-popup-header w-100 border-bottom'>
              <div className='card d-block d-block border-0 p-3'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='/assets/images/user-12.png' alt='avater' className='w35 me-1' />
                </figure>
                <h5 className='fw-700 text-primary font-xssss mb-1 mt-1'>Hendrix Stamp</h5>
                <h4 className='text-grey-500 font-xsssss mb-0 mt-0'>
                  <span className='d-inline-block bg-success btn-round-xss m-0' /> Available
                </h4>
                <div className='font-xssss position-absolute pointer right-0 top-0 me-4 mt-3'>
                  <i className='ti-close text-grey-900 d-inline-block mt-2' />
                </div>
              </div>
            </div>
            <div className='modal-popup-body w-100 h-auto p-3'>
              <div className='message'>
                <div className='message-content font-xssss lh-24 fw-500'>Hi, how can I help you?</div>
              </div>
              <div className='date-break font-xsssss lh-24 fw-500 text-grey-500 mb-2 mt-2'>Mon 10:20am</div>
              <div className='message self mt-2 text-right'>
                <div className='message-content font-xssss lh-24 fw-500'>
                  I want those files for you. I want you to send 1 PDF and 1 image file.
                </div>
              </div>
              <div className='snippet bg-grey float-right mt-2 rounded-xl pb-2 pe-3 ps-4 pt-3' data-title='.dot-typing'>
                <div className='stage'>
                  <div className='dot-typing' />
                </div>
              </div>
              <div className='clearfix' />
            </div>
            <div className='modal-popup-footer w-100 border-top'>
              <div className='card d-block d-block border-0 p-3'>
                <div className='form-group icon-right-input style1-input mb-0'>
                  <input
                    type='text'
                    placeholder='Start typing..'
                    className='form-control bg-greylight font-xssss fw-500 rounded-xl border-0 ps-3'
                  />
                  <i className='feather-send text-grey-500 font-md' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='row feed-body'>
              <div className='col-xl-8 col-xxl-9 col-lg-8'>
                <div className='slick-slider slick-initialized' dir='ltr'>
                  <div className='slick-list'>
                    <div
                      className='slick-track'
                      style={{ width: 5040, opacity: 1, transform: 'translate3d(0px, 0px, 0px)' }}
                    >
                      <div
                        data-index={0}
                        className='slick-slide slick-active slick-current'
                        tabIndex={-1}
                        aria-hidden='false'
                        style={{ outline: 'none' }}
                      >
                        <div>
                          <div
                            data-bs-toggle='modal'
                            data-bs-target='#Modalstory'
                            className='card w125 h200 d-block rounded-xxxl bg-dark mb-3 me-3 mt-0 overflow-hidden border-0 shadow-none'
                            tabIndex={-1}
                            style={{ width: '100%', display: 'inline-block' }}
                          >
                            <div className='card-body d-block w-100 position-absolute bottom-0 p-3 text-center'>
                              <span className='btn-round-lg bg-white'>
                                <a href='/defaultstorie'>
                                  <i className='feather-plus font-lg' />
                                </a>
                              </span>
                              <div className='clearfix mt-1' />
                              <h4 className='fw-700 position-relative z-index-1 ls-1 font-xssss mb-1 mt-2 text-white'>
                                Add Story{' '}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-index={1}
                        className='slick-slide'
                        tabIndex={-1}
                        aria-hidden='true'
                        style={{ outline: 'none' }}
                      ></div>
                      <div
                        data-index={2}
                        className='slick-slide'
                        tabIndex={-1}
                        aria-hidden='true'
                        style={{ outline: 'none' }}
                      >
                        <div>
                          <div tabIndex={-1} style={{ width: '100%', display: 'inline-block' }}>
                            <div
                              className='card w125 h200 d-block shadow-xss rounded-xxxl bg-gradiant-bottom mb-3 me-3  mt-0 overflow-hidden border-0'
                              style={{ backgroundImage: 'url("assets/images/s-2.jpg")' }}
                            >
                              <div className='card-body d-block w-100 position-absolute bottom-0 p-3 text-center'>
                                <figure className='avatar position-relative w50 z-index-1 mb-0 me-auto ms-auto overflow-hidden'>
                                  <img
                                    src='/assets/images/user-2.png'
                                    alt='avater'
                                    className='rounded-circle w-100 shadow-xss float-right bg-white p-0'
                                  />
                                </figure>
                                <div className='clearfix mt-1' />
                                <h4 className='fw-600 position-relative z-index-1 ls-1 font-xssss mb-1 mt-2 text-white'>
                                  Seary Victor{' '}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-index={3}
                        className='slick-slide'
                        tabIndex={-1}
                        aria-hidden='true'
                        style={{ outline: 'none' }}
                      >
                        <div>
                          <div tabIndex={-1} style={{ width: '100%', display: 'inline-block' }}>
                            <div
                              className='card w125 h200 d-block shadow-xss rounded-xxxl bg-gradiant-bottom mb-3 me-3  mt-0 overflow-hidden border-0'
                              style={{ backgroundImage: 'url("assets/images/s-6.jpg")' }}
                            >
                              <div className='card-body d-block w-100 position-absolute bottom-0 p-3 text-center'>
                                <figure className='avatar position-relative w50 z-index-1 mb-0 me-auto ms-auto overflow-hidden'>
                                  <img
                                    src='/assets/images/user-3.png'
                                    alt='avater'
                                    className='rounded-circle w-100 shadow-xss float-right bg-white p-0'
                                  />
                                </figure>
                                <div className='clearfix mt-1' />
                                <h4 className='fw-600 position-relative z-index-1 ls-1 font-xssss mb-1 mt-2 text-white'>
                                  John Steere{' '}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-index={4}
                        className='slick-slide'
                        tabIndex={-1}
                        aria-hidden='true'
                        style={{ outline: 'none' }}
                      >
                        <div>
                          <div tabIndex={-1} style={{ width: '100%', display: 'inline-block' }}>
                            <div
                              className='card w125 h200 d-block shadow-xss rounded-xxxl bg-gradiant-bottom mb-3 me-3  mt-0 overflow-hidden border-0'
                              style={{ backgroundImage: 'url("assets/images/s-5.jpg")' }}
                            >
                              <div className='card-body d-block w-100 position-absolute bottom-0 p-3 text-center'>
                                <figure className='avatar position-relative w50 z-index-1 mb-0 me-auto ms-auto overflow-hidden'>
                                  <img
                                    src='/assets/images/user-4.png'
                                    alt='avater'
                                    className='rounded-circle w-100 shadow-xss float-right bg-white p-0'
                                  />
                                </figure>
                                <div className='clearfix mt-1' />
                                <h4 className='fw-600 position-relative z-index-1 ls-1 font-xssss mb-1 mt-2 text-white'>
                                  Mohannad{' '}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-index={5}
                        className='slick-slide'
                        tabIndex={-1}
                        aria-hidden='true'
                        style={{ outline: 'none' }}
                      >
                        <div>
                          <div tabIndex={-1} style={{ width: '100%', display: 'inline-block' }}>
                            <div
                              className='card w125 h200 d-block shadow-xss rounded-xxxl bg-gradiant-bottom mb-3 me-3  mt-0 overflow-hidden border-0'
                              style={{ backgroundImage: 'url("assets/images/s-7.jpg")' }}
                            >
                              <div className='card-body d-block w-100 position-absolute bottom-0 p-3 text-center'>
                                <figure className='avatar position-relative w50 z-index-1 mb-0 me-auto ms-auto overflow-hidden'>
                                  <img
                                    src='/assets/images/user-7.png'
                                    alt='avater'
                                    className='rounded-circle w-100 shadow-xss float-right bg-white p-0'
                                  />
                                </figure>
                                <div className='clearfix mt-1' />
                                <h4 className='fw-600 position-relative z-index-1 ls-1 font-xssss mb-1 mt-2 text-white'>
                                  Studio{' '}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-index={6}
                        className='slick-slide'
                        tabIndex={-1}
                        aria-hidden='true'
                        style={{ outline: 'none' }}
                      >
                        <div>
                          <div tabIndex={-1} style={{ width: '100%', display: 'inline-block' }}>
                            <div
                              className='card w125 h200 d-block shadow-xss rounded-xxxl bg-gradiant-bottom mb-3 me-3  mt-0 overflow-hidden border-0'
                              style={{ backgroundImage: 'url("assets/images/s-1.jpg")' }}
                            >
                              <div className='card-body d-block w-100 position-absolute bottom-0 p-3 text-center'>
                                <figure className='avatar position-relative w50 z-index-1 mb-0 me-auto ms-auto overflow-hidden'>
                                  <img
                                    src='/assets/images/user-5.png'
                                    alt='avater'
                                    className='rounded-circle w-100 shadow-xss float-right bg-white p-0'
                                  />
                                </figure>
                                <div className='clearfix mt-1' />
                                <h4 className='fw-600 position-relative z-index-1 ls-1 font-xssss mb-1 mt-2 text-white'>
                                  Hendrix{' '}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-index={7}
                        className='slick-slide'
                        tabIndex={-1}
                        aria-hidden='true'
                        style={{ outline: 'none' }}
                      >
                        <div>
                          <div tabIndex={-1} style={{ width: '100%', display: 'inline-block' }}>
                            <div
                              className='card w125 h200 d-block shadow-xss rounded-xxxl bg-gradiant-bottom mb-3 me-3  mt-0 overflow-hidden border-0'
                              style={{ backgroundImage: 'url("assets/images/s-2.jpg")' }}
                            >
                              <div className='card-body d-block w-100 position-absolute bottom-0 p-3 text-center'>
                                <figure className='avatar position-relative w50 z-index-1 mb-0 me-auto ms-auto overflow-hidden'>
                                  <img
                                    src='/assets/images/user-6.png'
                                    alt='avater'
                                    className='rounded-circle w-100 shadow-xss float-right bg-white p-0'
                                  />
                                </figure>
                                <div className='clearfix mt-1' />
                                <h4 className='fw-600 position-relative z-index-1 ls-1 font-xssss mb-1 mt-2 text-white'>
                                  Zitoun{' '}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Skeleton */}
                {isLoading && (
                  <div>
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                      <CustomizeSkeleton />
                    </div>
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                      <CustomizeSkeleton />
                    </div>
                  </div>
                )}

                {/* Modal create  post */}
                {
                  userLogin?.roleCodes === TYPE_POST_BUSINESS && <CreatePostSelector
                    id={userLogin?.id}
                    group={2}
                    avatar={userLogin?.image}
                    name={userLogin?.name}
                    groupName={code}
                  />
                }
                {/* Render post */}
                {data?.data.map((item) => renderItem(item))}
                <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4 text-center'>
                  <div className='snippet me-auto ms-auto mt-2' data-title='.dot-typing'>
                    <div className='stage'>
                      <div className='dot-typing' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-xxl-3 col-lg-4 ps-lg-0'>
                <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0'>
                  <div className='card-body d-flex align-items-center p-4'>
                    <h4 className='fw-700 font-xssss text-grey-900 mb-0'>Friend Request</h4>
                    <a href='/defaultmember' className='fw-600 font-xssss text-primary ms-auto'>
                      See all
                    </a>
                  </div>
                  <div className='wrap'>
                    <div className='card-body d-flex bor-0 pb-0 pe-4 ps-4 pt-0'>
                      <figure className='avatar me-3'>
                        <img src='/assets/images/user-7.png' alt='avater' className='rounded-circle w45 shadow-sm' />
                      </figure>
                      <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
                        Anthony Daugloi{' '}
                        <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>12 mutual friends</span>
                      </h4>
                    </div>
                    <div className='card-body d-flex align-items-center pb-4 pe-4 ps-4 pt-0'>
                      <a
                        href='/defaultmember'
                        className='lh-20 w100 bg-primary-gradiant font-xssss fw-600 ls-1 me-2 rounded-xl p-2 text-center text-white'
                      >
                        Confirm
                      </a>
                      <a
                        href='/defaultmember'
                        className='lh-20 w100 bg-grey text-grey-800 font-xssss fw-600 ls-1 rounded-xl p-2 text-center'
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                  <div className='wrap'>
                    <div className='card-body d-flex bor-0 pb-0 pe-4 ps-4 pt-0'>
                      <figure className='avatar me-3'>
                        <img src='/assets/images/user-8.png' alt='avater' className='rounded-circle w45 shadow-sm' />
                      </figure>
                      <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
                        Mohannad Zitoun{' '}
                        <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>18 mutual friends</span>
                      </h4>
                    </div>
                    <div className='card-body d-flex align-items-center pb-4 pe-4 ps-4 pt-0'>
                      <a
                        href='/defaultmember'
                        className='lh-20 w100 bg-primary-gradiant font-xssss fw-600 ls-1 me-2 rounded-xl p-2 text-center text-white'
                      >
                        Confirm
                      </a>
                      <a
                        href='/defaultmember'
                        className='lh-20 w100 bg-grey text-grey-800 font-xssss fw-600 ls-1 rounded-xl p-2 text-center'
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                  <div className='wrap'>
                    <div className='card-body d-flex bor-0 pb-0 pe-4 ps-4 pt-0'>
                      <figure className='avatar me-3'>
                        <img src='/assets/images/user-6.png' alt='avater' className='rounded-circle w45 shadow-sm' />
                      </figure>
                      <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
                        Hurin Seary{' '}
                        <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>28 mutual friends</span>
                      </h4>
                    </div>
                    <div className='card-body d-flex align-items-center pb-4 pe-4 ps-4 pt-0'>
                      <a
                        href='/defaultmember'
                        className='lh-20 w100 bg-primary-gradiant font-xssss fw-600 ls-1 me-2 rounded-xl p-2 text-center text-white'
                      >
                        Confirm
                      </a>
                      <a
                        href='/defaultmember'
                        className='lh-20 w100 bg-grey text-grey-800 font-xssss fw-600 ls-1 rounded-xl p-2 text-center'
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0'>
                  <div className='card-body d-flex align-items-center p-4'>
                    <h4 className='fw-700 font-xssss text-grey-900 mb-0'>Confirm Friend</h4>
                    <a href='/defaultmember' className='fw-600 font-xssss text-primary ms-auto'>
                      See all
                    </a>
                  </div>
                  <div className='card-body bg-transparent-card d-flex bg-greylight rounded-3 mb-3 me-3 ms-3 p-3'>
                    <figure className='avatar mb-0 me-2'>
                      <img src='/assets/images/user-4.png' alt='avater' className='rounded-circle w45 shadow-sm' />
                    </figure>
                    <h4 className='fw-700 text-grey-900 font-xssss mt-2'>
                      Armany Seary{' '}
                      <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>45 mutual friends</span>
                    </h4>
                    <a href='/defaultmember' className='btn-round-sm ms-auto mt-2 bg-white'>
                      <span className='feather-chevron-right font-xss text-grey-900' />
                    </a>
                  </div>
                  <div className='card-body bg-transparent-card d-flex bg-greylight rounded-3 mb-3 me-3 ms-3 p-3'>
                    <figure className='avatar mb-0 me-2'>
                      <img src='/assets/images/user-3.png' alt='avater' className='rounded-circle w45 shadow-sm' />
                    </figure>
                    <h4 className='fw-700 text-grey-900 font-xssss mt-2'>
                      Mohannad Zitoun{' '}
                      <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>18 mutual friends</span>
                    </h4>
                    <a href='/defaultmember' className='btn-round-sm ms-auto mt-2 bg-white'>
                      <span className='feather-chevron-right font-xss text-grey-900' />
                    </a>
                  </div>
                  <div className='card-body bg-transparent-card d-flex bg-greylight rounded-3 mb-3 me-3 ms-3 p-3'>
                    <figure className='avatar mb-0 me-2'>
                      <img src='/assets/images/user-2.png' alt='avater' className='rounded-circle w45 shadow-sm' />
                    </figure>
                    <h4 className='fw-700 text-grey-900 font-xssss mt-2'>
                      Hurin Seary{' '}
                      <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>28 mutual friends</span>
                    </h4>
                    <a href='/defaultmember' className='btn-round-sm ms-auto mt-2 bg-white'>
                      <span className='feather-chevron-right font-xss text-grey-900' />
                    </a>
                  </div>
                </div>
                <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0'>
                  <div className='card-body d-flex align-items-center p-4'>
                    <h4 className='fw-700 font-xssss text-grey-900 mb-0'>Suggest Pages</h4>
                    <a href='/defaultmember' className='fw-600 font-xssss text-primary ms-auto'>
                      See all
                    </a>
                  </div>
                  <div className='wrap'>
                    <div className='card-body d-flex bor-0 overflow-hidden pb-0 pe-4 ps-4  pt-0'>
                      <img src='/assets/images/g-2.jpg' alt='group' className='img-fluid rounded-xxl mb-2' />
                    </div>
                    <div className='card-body d-flex align-items-center pb-4 pe-4 ps-4 pt-0'>
                      <a
                        href='/defaultgroup'
                        className='lh-28 w-100 bg-grey text-grey-800 font-xssss fw-700 rounded-xl p-2 text-center'
                      >
                        <i className='feather-external-link font-xss me-2' /> Like Page
                      </a>
                    </div>
                  </div>
                  <div className='wrap'>
                    <div className='card-body d-flex bor-0 overflow-hidden pb-0 pe-4 ps-4  pt-0'>
                      <img src='/assets/images/g-3.jpg' alt='group' className='img-fluid rounded-xxl mb-2' />
                    </div>
                    <div className='card-body d-flex align-items-center pb-4 pe-4 ps-4 pt-0'>
                      <a
                        href='/defaultgroup'
                        className='lh-28 w-100 bg-grey text-grey-800 font-xssss fw-700 rounded-xl p-2 text-center'
                      >
                        <i className='feather-external-link font-xss me-2' /> Like Page
                      </a>
                    </div>
                  </div>
                </div>
                <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0'>
                  <div className='card-body d-flex align-items-center p-4'>
                    <h4 className='fw-700 font-xssss text-grey-900 mb-0'>Events</h4>
                    <a href='/defaultevent' className='fw-600 font-xssss text-primary ms-auto'>
                      See all
                    </a>
                  </div>
                  <div className='card-body d-flex overflow-hidden pb-3 pe-4 ps-4 pt-0'>
                    <div className='bg-success rounded-xxl bg-warning me-2 p-3'>
                      <h4 className='fw-700 font-lg ls-3 lh-1 mb-0 text-white'>
                        <span className='ls-1 d-block font-xsss fw-600 text-white'>APR</span>13
                      </h4>
                    </div>
                    <h4 className='fw-700 text-grey-900 font-xssss mt-2'>
                      Meeting with clients{' '}
                      <span className='d-block font-xsssss fw-500 lh-4 text-grey-500 mt-1'>
                        41 madison ave, floor 24 new work, NY 10010
                      </span>{' '}
                    </h4>
                  </div>
                  <div className='card-body d-flex overflow-hidden pb-3 pe-4 ps-4 pt-0'>
                    <div className='bg-success rounded-xxl bg-primary me-2 p-3'>
                      <h4 className='fw-700 font-lg ls-3 lh-1 mb-0 text-white'>
                        <span className='ls-1 d-block font-xsss fw-600 text-white'>APR</span>22
                      </h4>
                    </div>
                    <h4 className='fw-700 text-grey-900 font-xssss mt-2'>
                      Developer Programe{' '}
                      <span className='d-block font-xsssss fw-500 lh-4 text-grey-500 mt-1'>
                        41 madison ave, floor 24 new work, NY 10010
                      </span>{' '}
                    </h4>
                  </div>
                  <div className='card-body d-flex overflow-hidden pb-3 pe-4 ps-4 pt-0'>
                    <div className='bg-success rounded-xxl bg-success me-2 p-3'>
                      <h4 className='fw-700 font-lg ls-3 lh-1 mb-0 text-white'>
                        <span className='ls-1 d-block font-xsss fw-600 text-white'>APR</span>30
                      </h4>
                    </div>
                    <h4 className='fw-700 text-grey-900 font-xssss mt-2'>
                      Aniversary Event{' '}
                      <span className='d-block font-xsssss fw-500 lh-4 text-grey-500 mt-1'>
                        41 madison ave, floor 24 new work, NY 10010
                      </span>{' '}
                    </h4>
                  </div>
                </div>
                <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0'>
                  <div className='card-body d-flex align-items-center  p-4'>
                    <h4 className='fw-700 font-xssss text-grey-900 mb-0'>Photos</h4>
                    <a href='/home' className='fw-600 font-xssss text-primary ms-auto'>
                      See all
                    </a>
                  </div>
                  <div className='card-body d-block pb-2 pt-0'>
                    <div className='row pe-3 ps-3'>
                      <div className='col-6 mb-1 p-1'>
                        <div>
                          <a href='#portfolio-details'>
                            <img src='/assets/images/e-1.jpg' alt='Portfolio' className='img-fluid rounded-3 w-100' />
                          </a>
                        </div>
                      </div>
                      <div className='col-6 mb-1 p-1'>
                        <div>
                          <a href='#portfolio-details'>
                            <img src='/assets/images/e-2.jpg' alt='Portfolio' className='img-fluid rounded-3 w-100' />
                          </a>
                        </div>
                      </div>
                      <div className='col-6 mb-1 p-1'>
                        <div>
                          <a href='#portfolio-details'>
                            <img src='/assets/images/e-3.jpg' alt='Portfolio' className='img-fluid rounded-3 w-100' />
                          </a>
                        </div>
                      </div>
                      <div className='col-6 mb-1 p-1'>
                        <div>
                          <a href='#portfolio-details'>
                            <img src='/assets/images/e-4.jpg' alt='Portfolio' className='img-fluid rounded-3 w-100' />
                          </a>
                        </div>
                      </div>
                      <div className='col-6 mb-1 p-1'>
                        <div>
                          <a href='#portfolio-details'>
                            <img src='/assets/images/e-5.jpg' alt='Portfolio' className='img-fluid rounded-3 w-100' />
                          </a>
                        </div>
                      </div>
                      <div className='col-6 mb-1 p-1'>
                        <div>
                          <a href='#portfolio-details'>
                            <img src='/assets/images/e-6.jpg' alt='Portfolio' className='img-fluid rounded-3 w-100' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body d-block w-100 pt-0'>
                    <a
                      href='/home'
                      className='lh-28 w-100 d-block bg-grey text-grey-800 font-xssss fw-700 rounded-xl p-2 text-center'
                    >
                      <i className='feather-external-link font-xss me-2' /> More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='app-footer bg-primary-gradiant border-0 shadow-lg'>
        <a className='nav-content-bttn nav-center' href='/home'>
          <i className='feather-home' />
        </a>
        <a className='nav-content-bttn' href='/defaultvideo'>
          <i className='feather-package' />
        </a>
        <a className='nav-content-bttn' data-tab='chats' href='/defaultlive'>
          <i className='feather-layout' />
        </a>
        <a className='nav-content-bttn' href='/shop2'>
          <i className='feather-layers' />
        </a>
        <a className='nav-content-bttn' href='/defaultsettings'>
          <img src='/assets/images/female-profile.png' alt='user' className='w30 shadow-xss' />
        </a>
      </div>
    </>
  )
}
