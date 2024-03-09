// import { useSession } from '@clerk/clerk-react'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
// import { z } from "zod"
import PageLayout from "@/layouts/Page"
import * as React from 'react'
//import Box from '@mui/material/Box'
import { InputLabel, Switch, Typography, Button, Box, Stack, Divider, TextField } from '@mui/material'
import { FormProvider, useForm, useFieldArray, type FieldArrayWithId } from "react-hook-form"
import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { defaultAction } from "@/types/Action"
import { CreateItemSchema, type CreateItem } from "@/types/CreateItem"
import { defaultProject } from "@/types/Project"
import ActionableForm from "@/components/processItem/ActionableStepsForm"
import useWriteBearer from "@/hooks/useWriteBearer"
import useGetUnprocessed from "@/hooks/api/useGetUnprocessed"
import useCreateActions from "@/hooks/api/useCreateActions"
// import defaultStep from "@/forms/DefaultStep"



export default function ProcessItemPage() {
  const { openSnackbar } = useSnackbarContext()
  const [actionable, setActionable] = React.useState(true)

  const { unprocessedId } = useParams()
  const { mutateAsync: createActions } = useCreateActions()

  // console.log({unprocessedId})


  const unprocessedData = useGetUnprocessed(Number(unprocessedId))
  // console.log({unprocessedData})
  useWriteBearer()

  const defaultValues: CreateItem = {
    unprocessedId: 0,
    project: defaultProject,
    actions: [defaultAction],
  }


  const methods = useForm({
    defaultValues,
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
  const onSubmit = async (data: typeof defaultValues) => {
    try {
      console.log("========================= SUBMIT ============================= ", {data})
      await createActions(data)

      openSnackbar({ message: 'Item Processed', type: 'success' })
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
          <Typography variant="h2"> {unprocessedData?.data?.title || ""} </Typography>
          <Typography sx={{padding: 2}}> {unprocessedData?.data?.description || ""} </Typography>
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
            {/* <Button type="submit" variant="contained" sx={{  width: "75%" }} disabled={Object.keys(errors).length > 0}> */}
              submit
              {/* <Typography variant="h2"> */}
              {/* SUBMIT */}
              {/* </Typography> */}
            </Button>
          </Box>
        </Stack>
        </FormProvider>
      </Box>
    </PageLayout>
  )
}
