import classNames from "classnames"

interface NotificationPopupProps {
  show?: boolean
}

export default function NotificationPopup(props: NotificationPopupProps) {
  return (
    <div
      className={classNames('dropdown-menu notification-dropdown rounded-xxl right-0 border-0 p-4 shadow-lg', props.show ? 'show' : '')}
      aria-labelledby='dropdownMenu3'>
      <h4 className='fw-700 font-xss mb-4'>Notification</h4>
      <div className='card bg-transparent-card w-100 mb-3 border-0 ps-5'>
        <img src='/assets/images/user-8.png' alt='user' className='w40 position-absolute left-0' />
        <h5 className='font-xsss text-grey-900 fw-700 d-block mb-1 mt-0'>
          Hendrix Stamp <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'> 3 min</span>
        </h5>
        <h6 className='text-grey-500 fw-500 font-xssss lh-4'>There are many variations of pass..</h6>
      </div>
      <div className='card bg-transparent-card w-100 mb-3 border-0 ps-5'>
        <img src='/assets/images/user-4.png' alt='user' className='w40 position-absolute left-0' />
        <h5 className='font-xsss text-grey-900 fw-700 d-block mb-1 mt-0'>
          Goria Coast <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'> 2 min</span>
        </h5>
        <h6 className='text-grey-500 fw-500 font-xssss lh-4'>Mobile Apps UI Designer is require..</h6>
      </div>
      <div className='card bg-transparent-card w-100 mb-3 border-0 ps-5'>
        <img src='/assets/images/user-7.png' alt='user' className='w40 position-absolute left-0' />
        <h5 className='font-xsss text-grey-900 fw-700 d-block mb-1 mt-0'>
          Surfiya Zakir <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'> 1 min</span>
        </h5>
        <h6 className='text-grey-500 fw-500 font-xssss lh-4'>Mobile Apps UI Designer is require..</h6>
      </div>
      <div className='card bg-transparent-card w-100 border-0 ps-5'>
        <img src='/assets/images/user-6.png' alt='user' className='w40 position-absolute left-0' />
        <h5 className='font-xsss text-grey-900 fw-700 d-block mb-1 mt-0'>
          Victor Exrixon <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'> 30 sec</span>
        </h5>
        <h6 className='text-grey-500 fw-500 font-xssss lh-4'>Mobile Apps UI Designer is require..</h6>
      </div>
    </div>
  )
}
