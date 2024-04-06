import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  Typography,
  DialogActions,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from '@mui/material'

interface ConfirmationDialogProps {
  open: boolean
  title: string
  onCancel?: () => void
  onConfirm: () => void
}

export default function ActionDeletedDialog({ open, title, onCancel, onConfirm }: ConfirmationDialogProps){
  const isMobile = useMediaQuery('(max-width: 460px)')

  console

  const handleConfirm = () => {
    onConfirm()
  }

  const handleCancel = () => {
    onCancel && onCancel()
  }

  console.log({title})

  return (
    <Dialog open={open} onClose={handleCancel} fullScreen={isMobile}>
      <Stack justifyContent="center" p={2}>
        <DialogTitle
          color="primary"
          fontSize={24}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignSelf="stretch"
        >
        Delete Action: &nbsp;{<Typography color="grey.700" fontSize={24}>{title}</Typography>}
          <IconButton onClick={handleCancel}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogActions>
          <Stack direction="row" justifyContent="flex-end" gap={1}>
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

