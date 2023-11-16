import { Alert, Snackbar as MuiSnackbar, Typography } from '@mui/material'

import { useSnackbarContext } from '@/contexts/SnackbarContext'

export default function Snackbar() {

  const { snackbar, openSnackbar } = useSnackbarContext()
  const { message, type, ...snackbarData } = snackbar

  function closeSnackBar() {
    openSnackbar({ open: false })
  }

  return (
    <MuiSnackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom'}}
      onClose={closeSnackBar}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      {...snackbarData}
    >
      <Alert severity={type} onClose={closeSnackBar}>
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </MuiSnackbar>
  )
}
