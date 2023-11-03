import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface NavItemProps {
  active: boolean
  children: JSX.Element[] | JSX.Element
  to: string
}

{
  /* <i className='feather-home font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 ' /> */
}

export default function NavItem(props: NavItemProps) {
  return (
    <Link
      to={props.to}
      className={classNames('menu-icon center-menu-icon ms-3 p-2 text-center', props.active ? 'active' : undefined)}
    >
      {props.children}
    </Link>
  )
}
