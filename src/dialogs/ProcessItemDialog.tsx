import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { AxiosError } from 'axios'
import ControlledTextField from "@/forms/ControlledTextField"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";


import { useSnackbarContext } from '@/contexts/SnackbarContext'


interface ProcessItemProps {
  open: boolean
  onClose: () => void
  title?: string
  description: string
}

export default function ProcessItemDialog({
  open,
  onClose,
}: ProcessItemProps) {
  const handleClose = () => {
    onClose()
    reset(defaultValues)
  }
  // let clickedProcess = useRef<boolean>(false)
  let clickedProcess = false
  const navigate = useNavigate()
  // const [actionable, 

  const defaultValues = {
    title: "",
    description: "",
  }


  const { openSnackbar } = useSnackbarContext()
  const formSchema = z.object({
    title: z.string().nullable(),
    description: z.string().min(1, { message: 'Description is required' }),
  })


  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      // const newItemId = mutateAsync await createContact(data)
      const newItemId = 13
      console.log("submit")
      openSnackbar({ message: 'New item added', type: 'success' })
      if (clickedProcess === true){
        // uncategorized things are "stuff"
        navigate(`/process/${newItemId}?actionable=${actionable}`)
      }
      onClose()
      reset(defaultValues)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      openSnackbar({
        message:
          error.response?.data.message ?? 'Error: Unable to create item',
        type: 'error',
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown={true}
      maxWidth="sm"
      sx={{
        gap: 3,
        borderRadius: '12px',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ padding: 4 }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            color: 'primary.main',
          }}
        >
          Add New Item
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Stack spacing={3}>
          <ControlledTextField
            control={control}
            name="title"
            label="Title"
            TextFieldProps={{
              sx: {
                width: '50%',
              }
            }}
          />
          <ControlledTextField
            control={control}
            name="description"
            label="Description"
          />
        </Stack>
        <Button type='submit' onClick={() => clickedProcess = true}>
          Process Now
        </Button>
      </Box>
    </Dialog>
  )
}
