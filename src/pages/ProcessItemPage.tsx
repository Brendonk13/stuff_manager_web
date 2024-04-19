import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useNavigate } from 'react-router-dom'
import PageLayout from "@/layouts/Page"
import * as React from 'react'
import { Switch, Typography, Button, Box, Stack, Divider } from '@mui/material'
import { FormProvider, useForm } from "react-hook-form"
import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { CreateItemSchema, type CreateItem } from "@/types/CreateItem"
import { defaultCreateItem } from "@/types/CreateItem"
import ActionableForm from "@/components/processItem/ActionableStepsForm"
import useWriteBearer from "@/hooks/useWriteBearer"
import useGetUnprocessed from "@/hooks/api/useGetUnprocessed"
import useCreateActions from "@/hooks/api/useCreateActions"



export default function ProcessItemPage() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbarContext()
  const [actionable, setActionable] = React.useState(true)

  const { unprocessedId } = useParams()
  const { mutateAsync: createActions } = useCreateActions()


  const {data: unprocessed} = useGetUnprocessed(Number(unprocessedId))
  useWriteBearer()

  const methods = useForm({
    defaultValues: defaultCreateItem,
    resolver: zodResolver(CreateItemSchema),
  })

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, },
  } = methods

  if (Object.keys(errors).length > 0){
    console.log("PROCESS ITEM PAGE QUERY FILTER ERRORS, VALUES", {errors}, {values: getValues()})
  }

  // when we get the unprocessedId from the query param, convert to Number and add to form
  React.useEffect(
    () => setValue('unprocessedId', Number(unprocessedId) ?? 0),
    [setValue, unprocessedId]
  )

    // form will fail cuz I dont have an unprocessedId in the form
  const onSubmit = async (data: CreateItem) => {
    try {
      console.log("========================= SUBMIT ============================= ", {data})
      await createActions(data)

      openSnackbar({ message: 'Item Processed', type: 'success' })
      // navigate('/actions')
      navigate('/actions?orderBy=[created,false]')
      // navigate('/actions?orderBy=%5Bcreated%2Cfalse%5D')
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      console.log("form ERROR", err)
      openSnackbar({
        message:
          error.response?.data.message ?? 'Error: Unable to Process item',
        type: 'error',
      })
    }
  }


  return (
    <PageLayout>
      <Box sx={{ width: '100%', padding: 2, }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
        <Stack spacing={2}>

        <Stack >
          <Typography variant="h2"> {unprocessed?.title || ""} </Typography>
          <Typography sx={{padding: 2}}> {unprocessed?.description || ""} </Typography>
        </Stack>
          <Divider sx={{borderBottomWidth:2}}/>
          <Stack direction="row">
          <Typography variant="h3">Actionable?</Typography>
            <Switch
              onChange={() => {setActionable(!actionable)}}
              checked={actionable}
            />
          </Stack>
            <br/>
          {actionable &&
            <ActionableForm />
          }
          <Box sx={{ display: "flex",  justifyContent: "center" }}>
              {/* todo: dont make this red but maybe just disabled -- no this is less clear*/}
            <Button type="submit" variant="contained" sx={{  width: "75%" }} color={Object.keys(errors).length > 0 ? "error" : "primary"}>
              submit
            </Button>
          </Box>
        </Stack>
        </FormProvider>
      </Box>
    </PageLayout>
  )
}
