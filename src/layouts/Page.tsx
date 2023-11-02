// import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Box } from '@mui/material'
import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// import ActionCenter from '@/components/common/ActionCenter'

interface IPageLayout {
  children: ReactNode
}

export default function PageLayout({ children }: IPageLayout) {
  return (
    <>
      {/* <SignedIn> */}
        <Box
          sx={{
            height: '100%',
            width: '100%',
            backgroundColor: '#F2F2F266',
            borderRadius: '20px',
            overflow: 'auto',
            p: 3,
          }}
        >
          {children}
        </Box>
      {/* </SignedIn> */}
      {/* <SignedOut> */}
      {/*   <Navigate to="/sign-in" /> */}
      {/* </SignedOut> */}
    </>
  )
}
