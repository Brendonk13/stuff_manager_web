import { AxiosError } from 'axios'
import { useState, useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack, Button } from "@mui/material"
import { FormProvider, useForm } from "react-hook-form"

import PageLayout from "@/layouts/Page"
import { useSnackbarContext } from '@/contexts/SnackbarContext'
import useListActions from "@/hooks/api/useListActions"
import ActionsFilterForm from "@/forms/ActionsFilterForm"

import { defaultActionQueryParams, ListActionQuerySchema, type ListActionResponse} from "@/types/Action"

export default function ActionsPage(){
  // let actionQueryParams = useRef<typeof defaultActionQueryParams>()
  const [actionQueryParams, setActionQueryParams] = useState(defaultActionQueryParams)
  // const [actions, setActions] = useState(useListActions(actionQueryParams))
  // const [actions, setActions] = useState(useListActions(actionQueryParams))
  const actions = useListActions(actionQueryParams)
  // const { data, refetch } = useListActions(actionQueryParams)
  // const actionsList = data
  // const [actions, setActions] = useState(data)
  //let actions = useRef<ListActionResponse>()
  console.log("actions, query filters", actions, { actionQueryParams })

  // useEffect(() => {
  //   setActions(actionsList)
  // }, [actionQueryParams])

  // todo: make it so changing this doesnt cause a complete re-render unless actionQueryParams changes
  const [showing, setShowing] = useState(false);
  const { openSnackbar } = useSnackbarContext()

  // just have autocomplete for: tags, required_context, project_id
  // slider for energy
  // calendar for date ?

  const defaultValues = defaultActionQueryParams


  const methods = useForm({
    defaultValues,
    resolver: zodResolver(ListActionQuerySchema),
  })

  const {
    handleSubmit,
    // setValue,
    formState: { errors, },
  } = methods
  // console.log("ERRORS", {errors})

  // useEffect(
  //   () => { actions.current = useListActions(actionQueryParams as typeof defaultValues) },
  //   [actionQueryParams],
  // )

  const onSubmit = async (data: typeof defaultActionQueryParams) => {
    try {
      console.log("========================= SUBMIT ============================= ", {data})
      // const transformedData = {
      //   project_id: data.project_id.project_id,
      // }

      // trigger a re-render with new actions
      setActionQueryParams(data)
      console.log("new query parameters: ", {actionQueryParams})
      // actions = useListActions(actionQueryParams)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      console.log("form ERROR", err)
      openSnackbar({
        message:
          error.response?.data.message ?? 'Error: Unable to submit list actions query form',
        type: 'error',
      })
    }
  }


  // todo: have one component for filters, another for displaying actions
  return (
    <PageLayout>
      <Stack>
        <Box sx={{ width: '100%', padding: 2, }} component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <ActionsFilterForm
              showing={showing}
              setShowing={setShowing}
            />
          </FormProvider>
        </Box>
        {/* <Button variant="contained" onClick={() => {}}> */}
        {/*   filters */}
        {/* </Button> */}
        actions
      </Stack>
    </PageLayout>
  )
}
