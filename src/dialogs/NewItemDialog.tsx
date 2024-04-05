import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from "zod"
import { Close } from '@mui/icons-material'
// import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material'
import { AxiosError } from 'axios'
import ControlledTextField from "@/components/controlled/ControlledTextField"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import { defaultCreateUnprocessed, CreateUnprocessedSchema } from "@/types/Unprocessed/CreateUnprocessed"
import useCreateUnprocessed from "@/hooks/api/useCreateUnprocessed"
import { useSnackbarContext } from '@/contexts/SnackbarContext'


interface NewItemProps {
  open: boolean
  onClose: () => void
}

export default function NewItemDialog({
  open,
  onClose,
}: NewItemProps) {
  const { openSnackbar } = useSnackbarContext()
  let clickedProcess = false
  const navigate = useNavigate()
  const {mutateAsync: createUnprocessed} = useCreateUnprocessed()

  // const defaultValues = {
  //   title: "",
  //   description: "",
  // }

  // // todo: import form values
  // const formSchema = z.object({
  //   title: z.string().nullable(),
  //   description: z.string().min(1, { message: 'Description is required' }),
  // })


  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: defaultCreateUnprocessed,
    resolver: zodResolver(CreateUnprocessedSchema),
  })

  const onSubmit = async (data: typeof defaultCreateUnprocessed) => {
    try {
      // const newItemId = mutateAsync await createContact(data)
      const created_item = await createUnprocessed(data)
      // const created_item = await createMutation.mutateAsync(data)
        //.then(() => navigate('/'))
      console.log({created_item})
      const newItemId = created_item?.data?.id ?? created_item.id
      console.log("submit dialog")
      openSnackbar({ message: 'New item added', type: 'success' })
      if (clickedProcess === true){
        navigate(`/stuff/new/${newItemId}`)
      }
      onClose()
      reset(defaultCreateUnprocessed)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      openSnackbar({
        message:
          error.response?.data.message ?? 'Error: Unable to create item',
        type: 'error',
      })
    }
  }

  const handleClose = () => {
    onClose()
    reset(defaultCreateUnprocessed)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown={true}
      maxWidth="sm"
      //fullWidth
      sx={{
        gap: 3,
        borderRadius: '12px',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ padding: 4, justifyContent: "space-between"}}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'text.primary',
            alignItems: 'center',
            fontSize: 26,
            fontWeight: '500',
            padding: 0,
          }}
        >
          Add New Item
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <br/>
        <Stack spacing={3}>
          <ControlledTextField
            control={control}
            name="title"
            label="Title"
            TextFieldProps={{
              sx: {
                width: '80%',
              },
              inputRef: input => input != null && input.focus(),
            }}
          />
          <ControlledTextField
            control={control}
            name="description"
            label="Description"
          />
        <Button type='submit' onClick={() => clickedProcess = true}>
          Process Now
        </Button>
        </Stack>
      </Box>
    </Dialog>
  )
}
