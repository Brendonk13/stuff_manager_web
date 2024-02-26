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
  const energy    = searchParams.get("energy")
  const title     = searchParams.get("title")
  const projectId = searchParams.get("project_id")
  const tags      = searchParams.get("tags")
  const required_context  = searchParams.get("required_context")
  if (energy           ) params.energy           = energy
  if (title            ) params.title            = title
  if (projectId        ) params.project_id       = projectId
  if (tags             ) params.tags             = tags
  if (required_context ) params.required_context = required_context

  return params
}

export default function ActionsPage(){
  // todo: check if there are existing query strings, if so then automatically submit form
  const [searchParams, setSearchParams] = useSearchParams()
  const merged = {...defaultActionQueryParams, ...extractSearchParamsFromURL(searchParams)}

  const [actionQueryParams, setActionQueryParams] = useState(merged)
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
      if (data?.energy && data.energy === -1){
        data.energy = null
      }

      // trigger a re-render with new actions
      setSearchParams(extractSearchParamsFromForm(data))
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
