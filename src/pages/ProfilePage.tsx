import { Button, Typography } from '@mui/material'
import { SignOutButton, UserProfile } from '@clerk/clerk-react'

import PageLayout from "@/layouts/Page"

export default function ProfilePage(){
  return (
    <PageLayout>
      {/* <SignOutButton> */}
      {/*   <Button variant="contained">Sign out</Button> */}
      {/* </SignOutButton> */}
      <UserProfile routing="hash"/>
    </PageLayout>
  )
}
