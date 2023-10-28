import classNames from 'classnames'

interface MobileNavigationProps {
  show?: boolean
}
export default function MobileNavigation(props: MobileNavigationProps) {
  return (
    <div className={classNames('navigation scroll-bar', props.show ? 'nav-active' : '')}>
      <div className='container pe-0 ps-0'>
        <div className='nav-content'>
          <div className='nav-wrap bg-transparent-card rounded-xxl shadow-xss mb-2 mt-2 bg-white pb-1 pt-3'>
            <div className='nav-caption fw-600 font-xssss text-grey-500'>
              <span>New </span>Feeds
            </div>
            <ul className='top-content mb-1'>
              <li className='logo d-none d-xl-block d-lg-block' />
              <li>
                <a className='nav-content-bttn open-font' href='/home'>
                  <i className='feather-tv btn-round-md bg-blue-gradiant me-3' />
                  <span>Newsfeed</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font' href='/defaultbadge'>
                  <i className='feather-award btn-round-md bg-red-gradiant me-3' />
                  <span>Badges</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font' href='/defaultstorie'>
                  <i className='feather-globe btn-round-md bg-gold-gradiant me-3' />
                  <span>Explore Stories</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font' href='/defaultgroup'>
                  <i className='feather-zap btn-round-md bg-mini-gradiant me-3' />
                  <span>Popular Groups</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font' href='/userpage'>
                  <i className='feather-user btn-round-md bg-primary-gradiant me-3' />
                  <span>Author Profile </span>
                </a>
              </li>
            </ul>
          </div>
          <div className='nav-wrap bg-transparent-card rounded-xxl shadow-xss mb-2 bg-white pb-1 pt-3'>
            <div className='nav-caption fw-600 font-xssss text-grey-500'>
              <span>More </span>Pages
            </div>
            <ul className='mb-3'>
              <li>
                <a className='nav-content-bttn open-font' href='/defaultemailbox'>
                  <i className='font-xl feather-inbox me-3 text-current' />
                  <span>Email Box</span>
                  <span className='circle-count bg-warning mt-1'>584</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font' href='/defaulthotel'>
                  <i className='font-xl feather-home me-3 text-current' />
                  <span>Near Hotel</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font' href='/defaultevent'>
                  <i className='font-xl feather-map-pin me-3 text-current' />
                  <span>Latest Event</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font' href='/defaultlive'>
                  <i className='font-xl feather-youtube me-3 text-current' />
                  <span>Live Stream</span>
                </a>
              </li>
            </ul>
          </div>
          <div className='nav-wrap bg-transparent-card rounded-xxl shadow-xss bg-white pb-1 pt-3'>
            <div className='nav-caption fw-600 font-xssss text-grey-500'>
              <span /> Account
            </div>
            <ul className='mb-1'>
              <li className='logo d-none d-xl-block d-lg-block' />
              <li>
                <a className='nav-content-bttn open-font h-auto pb-2 pt-2' href='/defaultsettings'>
                  <i className='font-sm feather-settings text-grey-500 me-3' />
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font h-auto pb-2 pt-2' href='/defaultanalytics'>
                  <i className='font-sm feather-pie-chart text-grey-500 me-3' />
                  <span>Analytics</span>
                </a>
              </li>
              <li>
                <a className='nav-content-bttn open-font h-auto pb-2 pt-2' href='/defaultmessage'>
                  <i className='font-sm feather-message-square text-grey-500 me-3' />
                  <span>Chat</span>
                  <span className='circle-count bg-warning mt-0'>23</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
