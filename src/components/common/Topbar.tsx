/* import { UserButton, useUser } from '@clerk/clerk-react' */
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { KeyboardArrowLeft, Search } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import sidebarLinks from './Sidebar/links'
import NewItemDialog from "@/dialogs/NewItemDialog"

export default function Topbar(){
  const navigate = useNavigate()
  // const [pageTitle, setPageTitle] = useState('Stuff')
  const [showBackButton, setShowBackButton] = useState(false)
  // const user = useUser()
  // todo: add search filters
  const searchingFor = "notes"
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false)

  const handleCloseNewItemDialog = () => {
    setNewItemDialogOpen(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        {/* todo: make this smaller */}
        {/* <Typography variant="h3" sx={{ fontSize: '30px', fontWeight: 'bold' }}> */}
        {/*   {pageTitle} */}
        {/* </Typography> */}
        {/* back button */}
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
        onClick={(e) => e}
      />

      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="contained" onClick={() => setNewItemDialogOpen(true)}>
          Add new
        </Button>

        {/* <UserButton afterSignOutUrl="/sign-in" /> */}
      </Stack>
      <NewItemDialog open={newItemDialogOpen} onClose={handleCloseNewItemDialog} />
    </Box>
  )
}

