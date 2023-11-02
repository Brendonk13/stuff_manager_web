import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Sidebar from '@/components/common/Sidebar'
import TopBar from '@/components/common/Topbar'
// import { SpotlightProvider } from '@/contexts/SpotlightContext'

export default function SidebarLayout() {
  return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          height: '100%',
        }}
      >
        <Sidebar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            p: 3,
            gap: 3,
          }}
        >
          <TopBar />
          <Outlet />
        </Box>
      </Box>
  )
}
