import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  // Typography,
  useMediaQuery,
} from '@mui/material'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'

interface ConfirmationDialogProps {
  open: boolean
  title: string
  onCancel?: () => void
  onConfirm: () => void
}

export default function ConfirmationDialog({ open, title, onCancel, onConfirm }: ConfirmationDialogProps){
  // const duplicateMutation = useCreateDuplicate()
  // const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 460px)')

  const handleConfirm = () => {
    // will this work on non-async ?
    onConfirm()
  }

  const handleCancel = () => {
    onCancel && onCancel()
  }

  return (
    <Dialog open={open} onClose={handleCancel} fullScreen={isMobile}>
      <Stack justifyContent={'center'} p={2}>
        <DialogTitle
          color="primary"
          fontSize={24}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignSelf="stretch"
        >
          {title}
          <IconButton onClick={handleCancel}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* <Stack justifyContent={'center'} alignItems={'flex-start'}> */}
          {/*   <Typography fontSize={'20px'} fontWeight={600}> */}
          {/*     Title: */}
          {/*   </Typography> */}
          {/*   <ControlledTextField fullWidth name="title" control={control} /> */}
          {/* </Stack> */}
        </DialogContent>
        <DialogActions>
          <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
            <Button
              onClick={handleCancel}
              color="secondary"
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              cancel
            </Button>
            <LoadingButton
              loading={false}
              onClick={handleConfirm}
              sx={{ fontSize: '18px', fontWeight: 600, boxShadow: 'none' }}
              variant="contained"
            >
              confirm
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Stack>
    </Dialog>
  )
}
