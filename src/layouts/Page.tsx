import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { Box } from '@mui/material'
import { type ReactNode, useEffect } from 'react'
// import { Navigate } from 'react-router-dom'
import getCookie from "@/utils/getCookie"
import useWriteBearer from "@/hooks/useWriteBearer"


interface IPageLayout {
  children: ReactNode
}

export default function PageLayout({ children }: IPageLayout) {
  useWriteBearer()

  return (
    <>
      <SignedIn>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            // backgroundColor: '#F2F2F266',
            // borderRadius: '20px',
            overflow: 'auto',
            p: 3,
          }}
        >
          {children}
        </Box>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
        {/* <Navigate to="/sign-in" /> */}
      </SignedOut>
    </>
  )
}
