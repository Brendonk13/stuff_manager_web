import { useEffect } from "react"
import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from '@mui/material'
// import { useFormContext } from "react-hook-form"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from "dayjs"
// import { camelizeKeys, decamelizeKeys } from "humps"

import ControlledDuration from "@/components/controlled/ControlledDuration"
// import Duration from "@/components/common/Duration"
import ControlledTextField from "@/components/controlled/ControlledTextField"
import ControlledDatePicker from "@/components/controlled/ControlledDatePicker"
// import ControlledTimeField from "@/components/controlled/ControlledTimeField"
// also need something for numbers

import { EditActionCompletionSchema, defaultActionCompletion } from "@/types/Action"
import useEditActionCompletion from "@/hooks/api/useEditActionCompletion"
import useGetActionCompletion from "@/hooks/api/useGetActionCompletion"
// this is used by: actionsPage, projectDetailsPage
// -- anywhere that lists actions

function transformDate(date: string) {
  return date ? dayjs(date) : null
}

interface ConfirmationDialogProps {
  open: boolean
  setOpen: (value: boolean) => void
  actionId: number
  actionCompletion?: any
  // title: string
  // onCancel?: () => void
  // onConfirm: () => void
}

// export default function ActionCompletedDialog({ open: openProp, title, onCancel, onConfirm }: ConfirmationDialogProps){
export default function ActionCompletedDialog({ open, setOpen, actionId, actionCompletion }: ConfirmationDialogProps){
  const isMobile = useMediaQuery('(max-width: 460px)')
  const { mutateAsync: editActionCompletion } = useEditActionCompletion()

  // what happens when the input for this is actionId = 0 ??
  // const { data: actionCompletion } = useGetActionCompletion(actionId)

  const methods = useForm({
    defaultValues: defaultActionCompletion,
    resolver: zodResolver(EditActionCompletionSchema),
  })

  // console.log(camelizeKeys({hello: "world", nested_object: {field_name: "field_name", nested_again: {fucking_thing: "yep"}}}))
  // console.log(camelizeKeys(actionCompletion))

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, },
  } = methods

  if (Object.keys(errors).length > 0){
    console.log("EDIT ACTION COMPLETION FORM ERRORS", {errors}, {values: getValues()})
  }

  // set default form values
  useEffect(() => setValue('actionId', actionId),
    [setValue, actionId])
    // [setValue, actionCompletion?.actionId])

  // useEffect(() => setValue('startTime', actionCompletion?.startTime ?? null),
  //   [setValue, actionCompletion?.startTime])

  useEffect(() => {
      // const newStart = actionCompletion?.startTime ? dayjs(actionCompletion.startTime) : null
      const newStart = transformDate(actionCompletion?.startTime)
      setValue('startTime', newStart)
    },
    [setValue, actionCompletion?.startTime])

  useEffect(() => {
      // const newEnd = actionCompletion?.endTime ? new Date(actionCompletion.endTime) : null
      // const newEnd = actionCompletion?.endTime ? dayjs(actionCompletion.endTime).toISOString() : null
      // const newEnd = actionCompletion?.endTime ? dayjs(actionCompletion.endTime) : null
      const newEnd = transformDate(actionCompletion?.endTime)
      // const newEnd = actionCompletion?.endTime ? actionCompletion.endTime : null
      console.log({newEnd}, actionCompletion?.endTime, {actionCompletion})
      setValue('endTime', newEnd)
    },
    [setValue, actionCompletion?.endTime])

  useEffect(() => setValue('duration', actionCompletion?.duration ?? [0,0,0]),
    [setValue, actionCompletion?.duration])

  useEffect(() => setValue('notes', actionCompletion?.notes ?? ""),
    [setValue, actionCompletion?.notes])

  const onSubmit = async (data: typeof defaultActionCompletion) => {
    try {
      console.log("========================= SUBMIT ============================= ", {data})

      const actionCompletion = await editActionCompletion(data)
      console.log({actionCompletion})

    } catch (e) {
      console.error(e)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

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
          Action Completed?
          <IconButton onClick={handleCancel}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogActions>
        {/* <Box sx={{ width: '100%', padding: 2, }} component="form" onSubmit={handleSubmit(onSubmit)}> */}
          <FormProvider {...methods}>
            <Stack spacing={1}>
              <ControlledDatePicker
                control={control}
                label="Start time"
                name="startTime"
              />
              <ControlledDatePicker
                control={control}
                label="End time"
                name="endTime"
              />
              <ControlledTextField
                control={control}
                name="notes"
                label="Notes"
              />


              {/* <br /> */}
              <ControlledDuration
                control={control}
                name="duration"
              />

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
                  type="submit"
                  onSubmit={handleSubmit(onSubmit)}
                  onClick={handleSubmit(onSubmit)}
                  sx={{ fontSize: '18px', fontWeight: 600, boxShadow: 'none' }}
                  variant="contained"
                >
                  confirm
                </LoadingButton>
              </Stack>
            </Stack>
          </FormProvider>
        </DialogActions>
      </Stack>
    </Dialog>
  )
}
