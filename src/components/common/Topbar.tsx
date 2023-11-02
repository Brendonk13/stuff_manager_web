/* import { UserButton, useUser } from '@clerk/clerk-react' */
import { KeyboardArrowLeft, Search } from "@mui/icons-material";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import sidebarLinks from './Sidebar/links'
import NewItemDialog from "@/dialogs/NewItemDialog"

export default function Topbar(){
  const location = useLocation()
  const { postId } = useParams()
  const navigate = useNavigate()
  const [pageTitle, setPageTitle] = useState('Stuff')
  const [showBackButton, setShowBackButton] = useState(false)
  /* const user = useUser() */
  // todo: add search filters
  const searchingFor = "notes"
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false)

  const handleCloseNewItemDialog = () => {
    setNewItemDialogOpen(false)
  }


  useEffect(() => {
    const link = sidebarLinks.find((link) => link.path === location.pathname)
    if (location.pathname.endsWith('/create-post')) {
      setPageTitle('New Post')
      setShowBackButton(false)
    } else if (location.pathname.endsWith(`preview-post/${postId}`)) {
      setPageTitle('Preview Post')
      setShowBackButton(true)
    } else if (link) {
      setShowBackButton(false)
      setPageTitle(link.text)
    }
  }, [location.pathname])



  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack direction="column" spacing={2} alignItems="center">
        {/* todo: make this smaller */}
        <Typography variant="h3" sx={{ fontSize: '30px', fontWeight: 'bold' }}>
          {pageTitle}
        </Typography>
        {showBackButton && (
          <Typography variant="subtitle2" position="absolute" pt={1} pr={1}>
            <Button onClick={() => navigate(-1)} variant="text" color="primary">
              <KeyboardArrowLeft />
              Back
            </Button>
          </Typography>
        )}
      </Stack>

      <TextField
        placeholder={`Search all ${searchingFor}...`}
        InputProps={{
          startAdornment: <Search color="primary" />,
          disableUnderline: true,
        }}
        variant="filled"
        sx={{ width: '30%' }}
        onClick={(e) => {return}}
      />

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Welcome back, user!</Typography>
        <Button onClick={() => setNewItemDialogOpen(true)}>
          Add new
        </Button>
        {/* <UserButton afterSignOutUrl="/sign-in" /> */}
      </Stack>
      <NewItemDialog open={newItemDialogOpen} onClose={handleCloseNewItemDialog} />
    </Box>
  )
}

