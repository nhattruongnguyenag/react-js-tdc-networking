import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { MenuOptionItem } from '../../types/MenuOptionItem'

interface PostOptionsMenuType {
  menuOptions: MenuOptionItem[]
  handleClickMenuOption: (type: number) => void
}

export default function PostOptionsMenu(props: Readonly<PostOptionsMenuType>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <i className='ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss' />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {props.menuOptions.map((item, index) => {
          return (
            item.visible && (
              <MenuItem key={index.toString()} onClick={() => props.handleClickMenuOption(item.type)}>
                {item.icon && (
                  <ListItemIcon>
                    <FontAwesomeIcon icon={item.icon} size='lg' color={item.color ? item.color : '#000'} />
                  </ListItemIcon>
                )}
                <span style={{ color: item.color ? item.color : '#000' }}>{item.name}</span>
              </MenuItem>
            )
          )
        })}
      </Menu>
    </React.Fragment>
  )
}
