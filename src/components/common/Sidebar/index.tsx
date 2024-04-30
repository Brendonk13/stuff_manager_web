import * as React from 'react'
import { useClerk } from '@clerk/clerk-react'

import { Link, ListItemText, ListItemIcon, ListItemButton, ListItem, Divider, List, Box, Drawer, Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
import sideBarLinks from "./links"
import MenuIcon from '@mui/icons-material/Menu'
// import { Link, useNavigate } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { SignOutButton } from '@clerk/clerk-react'
import LogoutIcon from '@mui/icons-material/Logout'

type Anchor =  'left'

function ClickableListItem({path, text, icon}){
  return (
    <Link component={RouterLink} to={path} key={text} underline="none" color="grey.700" >
      <ListItem
        sx={{
          '&:hover': {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
        key={text}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text}/>
      </ListItem>
    </Link>
  )
}

export default function TemporaryDrawer() {
  const { signOut } = useClerk()

  // const navigate = useNavigate()
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const anchor = 'left'

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {sideBarLinks.map(link => (
          <ClickableListItem path={link.path} text={link.text} icon={link.icon} />
          // <Link component={RouterLink} to={link.path} key={link.text} underline="none" color="grey.700" >
          //   <ListItem
          //     sx={{
          //       '&:hover': {
          //         backgroundColor: "rgba(0, 0, 0, 0.04)",
          //       },
          //     }}
          //     key={link.text}
          //   >
          //     <ListItemIcon>{link.icon}</ListItemIcon>
          //     <ListItemText primary={link.text}/>
          //   </ListItem>
          // </Link>
        ))}
      </List>

      {/* todo: add custom things here from favorites ? */}
      {/* or maybe favorites folds down when you click it like a menu */}
      {/* or maybe favorites always shows your top 5 */}


      <Divider />
      {/* <List sx={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}> */}
      <List >
        <ClickableListItem path="/settings" text="Settings" icon={<SettingsIcon/>} />
        <ClickableListItem path="/profile" text="Profile" icon={<AccountCircleIcon/>} />
        <ListItem
          sx={{
            '&:hover': {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
          key="Log Out"
          onClick={() => signOut()}
        >
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary="Log Out"/>
          {/* <SignOutButton> */}
          {/* <ListItemButton sx={{ '&:hover': {} }}> */}
          {/*   <ListItemIcon> */}
          {/*     <LogoutIcon/> */}
          {/*   </ListItemIcon> */}
          {/*   <ListItemText primary="Log Out"/> */}
          {/* </ListItemButton> */}
        {/* </SignOutButton> */}
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      {
      <React.Fragment key={anchor}>
      {/* <React.Fragment key={anchor} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}> */}
        <Button onClick={toggleDrawer(anchor, true)}> <MenuIcon/> </Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      }
    </div>
  )
}
