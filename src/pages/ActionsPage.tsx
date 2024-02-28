import { AxiosError } from 'axios'
import { useState, useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, Box, Stack, Button } from "@mui/material"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchParams, type URLSearchParamsInit } from "react-router-dom"

import Action from "@/components/common/Action"
import { type ListActionQueryParams } from "@/types/Action"
import PageLayout from "@/layouts/Page"
import { useSnackbarContext } from '@/contexts/SnackbarContext'
import useListActions from "@/hooks/api/useListActions"
import ActionsFilterForm from "@/forms/ActionsFilterForm"
import convertTags from "@/utils/random/convertTagsQueryParams"

import { defaultActionQueryParams, ListActionQuerySchema } from "@/types/Action"

function extractSearchParamsFromForm(formData){
  const params: ListActionQueryParams = {}
  // need null comparison incase user selected energy == 0
  if (formData?.energy !== null  ) params.energy           = formData.energy
  if (formData?.title            ) params.title            = formData.title
  if (formData?.project_id       ) params.project_id       = formData.project_id
  if (formData?.tags             ) params.tags             = convertTags(formData.tags)
  if (formData?.required_context ) params.required_context = convertTags(formData.required_context)

  // console.log("EBERGTY", formData?.energy)
  console.log("form params", {params}, "original data:", {formData})
  return params
}

function extractSearchParamsFromURL(searchParams){
  const params: ListActionQueryParams = {}
  const energy           = searchParams.get("energy")
  const title            = searchParams.get("title")
  const project_id       = searchParams.get("project_id")
  const tags             = searchParams.get("tags")
  const required_context = searchParams.get("required_context")
  if (energy           ) params.energy           = energy
  if (title            ) params.title            = title
  if (project_id       ) params.project_id       = project_id
  if (tags             ) params.tags             = tags
  if (required_context ) params.required_context = required_context

  return params
}

export default function ActionsPage(){
  // todo: check if there are existing query strings, if so then automatically submit form
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFormValues = {...defaultActionQueryParams, ...extractSearchParamsFromURL(searchParams)}
  // console.log({initialFormValues})

  const [actionQueryParams, setActionQueryParams] = useState(initialFormValues)
  // do I need to setActionQueryParams here? why is it working for other things
  console.log({actionQueryParams})
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

  window.addEventListener("popstate", () => {
    // todo: re-submit the form when this happens
    console.log("BACK CLICKED")
    setActionQueryParams(extractSearchParamsFromURL(searchParams))
  })


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
      // this function mostly just removes the nulls from appearing in the data so we get clean URLs (no null query string)
      const dataCombinedWithSearchParams = extractSearchParamsFromForm(
        {...initialFormValues, ...extractSearchParamsFromForm(data)}
      )

      // todo: clearing form values which were previously in the searchParams gets overwritten
      // idea: can I make it so that purposely set null values are undefined and then I check for undefined and remove them from dataCombinedWithSearchParams

      if (dataCombinedWithSearchParams?.energy && dataCombinedWithSearchParams.energy === -1){
        delete dataCombinedWithSearchParams.energy
      }
      console.log({dataCombinedWithSearchParams})

      // todo: do I need to set both of these or can I just do the searchParams
      // console.log({dataCombinedWithSearchParams}, {data})
      // set query string so that the form is filled with correct inital values
      setSearchParams(dataCombinedWithSearchParams)
      // trigger a re-render with new actions

      // todo: for some reason must set below for tags to work
      setActionQueryParams(dataCombinedWithSearchParams)

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
              initialFormValues={initialFormValues}
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
