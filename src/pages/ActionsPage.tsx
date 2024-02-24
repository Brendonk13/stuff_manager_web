import { AxiosError } from 'axios'
import { useState, useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, Box, Stack, Button } from "@mui/material"
import { FormProvider, useForm } from "react-hook-form"
import Action from "@/components/common/Action"

import PageLayout from "@/layouts/Page"
import { useSnackbarContext } from '@/contexts/SnackbarContext'
import useListActions from "@/hooks/api/useListActions"
import ActionsFilterForm from "@/forms/ActionsFilterForm"

import { defaultActionQueryParams, ListActionQuerySchema } from "@/types/Action"

export default function ActionsPage(){
  const [actionQueryParams, setActionQueryParams] = useState(defaultActionQueryParams)

  // the issue is that its not re-rendering upon getting the hook data and for some reason the hook is then called again
  const actions = useListActions(actionQueryParams)
  // console.log("actions, query filters", actions, { actionQueryParams })
  console.log({actions})

  // todo: make it so changing this doesnt cause a complete re-render unless actionQueryParams changes
  const [showingFilterMenu, setShowingFilterMenu] = useState(false);
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
    formState: { errors, },
  } = methods

  if (Object.keys(errors).length > 0){
    console.log("ACTIONS PAGE QUERY FILTER ERRORS", {errors})
  }

  const onSubmit = async (data: typeof defaultActionQueryParams) => {
    try {
      console.log("========================= SUBMIT ============================= ", {data})

      // trigger a re-render with new actions
      setActionQueryParams(data)
      // console.log("new query parameters: ", {actionQueryParams})
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
              showing={showingFilterMenu}
              setShowing={setShowingFilterMenu}
            />
          </FormProvider>
        </Box>
        {/* todo: decide if I want to keep this divider */}
        <Divider/>
        {actions?.data?.map(action => (
          <Action
            key={`Action_${action.id}`}
            action={action}
            showProjectName={true} // todo: should i always show this ?
          />
        ))}
      </Stack>
    </PageLayout>
  )
}
