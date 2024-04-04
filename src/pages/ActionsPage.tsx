import { AxiosError } from 'axios'
import { useState, useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, Box, Stack, Button } from "@mui/material"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

import ConfirmationDialog from "@/dialogs/ConfirmationDialog"
import useDraggableAction from "@/hooks/useDraggableAction"
import Action from "@/components/common/Action"
import PageLayout from "@/layouts/Page"
import { useSnackbarContext } from '@/contexts/SnackbarContext'
import useListActions from "@/hooks/api/useListActions"
import useGetAction from "@/hooks/api/useGetAction"
import ActionsFilterForm from "@/components/forms/ActionsFilterForm"
import convertTags from "@/utils/random/convertTagsQueryParams"
import { defaultActionQueryParams, ListActionQuerySchema, type ListActionQueryParams } from "@/types/Action/ListAction"
import useEditAction from "@/hooks/api/useEditAction"

function cleanupFormData(data) {
  if (data?.title === ""){
    data.title = null
  }
  if (data?.project_id === 0){
    data.project_id = null
  }

  if (data?.tags){
    data.tags = convertTags(data.tags)
  } if (data?.requiredContext){
    data.requiredContext = convertTags(data.requiredContext)
  }

}

function extractSearchParamsFromForm(formData){
  const params: ListActionQueryParams = {}
  // need null comparison incase user selected energy == 0
  if (formData?.energy !== null  ) params.energy           = formData.energy
  if (formData?.title            ) params.title            = formData.title
  if (formData?.project_id       ) params.project_id       = formData.project_id
  if (formData?.tags             ) params.tags             = convertTags(formData.tags)
  if (formData?.requiredContext ) params.requiredContext = convertTags(formData.requiredContext)

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
  const requiredContext = searchParams.get("requiredContext")
  if (energy           ) params.energy           = energy
  if (title            ) params.title            = title
  if (project_id       ) params.project_id       = project_id
  if (tags             ) params.tags             = tags
  if (requiredContext ) params.requiredContext = requiredContext

  return params
}

export default function ActionsPage(){

  const [completedActionId, setCompletedActionId] = useState(0)
  const [deletedActionId, setDeletedActionId] = useState(0)
  const [expandTags, setExpandTags] = useState(false)
  const [expandContexts, setExpandContexts] = useState(false)
  console.log({expandTags})

  const {data: action} = useGetAction(deletedActionId)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFormValues = {...defaultActionQueryParams, ...extractSearchParamsFromURL(searchParams)}

  cleanupFormData(initialFormValues)

  useDraggableAction({setCompletedActionId, setDeletedActionId})
  // console.log({initialFormValues})



  const [actionQueryParams, setActionQueryParams] = useState(initialFormValues)
  // do I need to setActionQueryParams here? why is it working for other things
  console.log({actionQueryParams})
  // the issue is that its not re-rendering upon getting the hook data and for some reason the hook is then called again
  const actions = useListActions(actionQueryParams)
  // console.log("actions, query filters", actions, { actionQueryParams })
  console.log({actions})

  const { mutateAsync: editAction } = useEditAction()

  // todo: make it so changing this doesnt cause a complete re-render unless actionQueryParams changes
  const [showingFilterMenu, setShowingFilterMenu] = useState(false);
  const { openSnackbar } = useSnackbarContext()

  const defaultValues = initialFormValues

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(ListActionQuerySchema),
  })

  const {
    handleSubmit,
    getValues,
    formState: { errors, },
  } = methods

  if (Object.keys(errors).length > 0){
    console.log("ACTIONS PAGE QUERY FILTER ERRORS", {errors}, {values: getValues()})
  }

  const setQueryParamsFromUrl = () => {
    const data = getValues()
    cleanupFormData(data)
    if (data?.project_id){ // todo: make this just run the normal transform project in zod
      // console.log("parsed zod", ListActionQuerySchema.project_id.parse(data.project_id))
      data.project_id = data.project_id.id
      if (data.project_id === 0){
        data.project_id = null
      }
    }

    // console.log("BACK CLICKED", {searchParams: extractSearchParamsFromURL(searchParams)}, {values: getValues()}, {data})
    // console.log("setQueryParamsFromUrl", {data})
    setActionQueryParams(data)
  }

  useEffect(() => {
    window.removeEventListener("popstate", setQueryParamsFromUrl)
    window.addEventListener("popstate", setQueryParamsFromUrl)
    return () => window.removeEventListener("popstate", setQueryParamsFromUrl)
  }, [])

  const onSubmit = async (_data: typeof defaultActionQueryParams) => {
    try {
      console.log("========================= SUBMIT ============================= ", {_data})
      const data = extractSearchParamsFromForm(_data)

      if (data?.energy && data.energy === -1){
        // only want query params that are relevant for the query
        delete data.energy
      }
      console.log({data})

      // set query string so that the form is filled with correct inital values
      setSearchParams(data)

      // trigger a re-render with new actions
      setActionQueryParams(data)

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

  const actionCompleted = async () => {
    if (completedActionId === 0){
      console.log("completedActionId is still zero for some reason")
      return
    }
    const actionData = {
      id: action.id,
      title: action.title,
    }
    const editedAction = await editAction(deletedActionId)
    console.log("DELETE UNPROCESSED", {result})
    console.log("DELETE ACTION", {action})
    setDeletedActionId(0)
  }

  const deleteAction = async () => {
    if (deletedActionId === 0){
      console.log("deletedActionId is still zero for some reason")
      return
    }
    // const result = await deleteAction(deletedActionId)
    // console.log("DELETE UNPROCESSED", {result})
    console.log("DELETE ACTION", {action})
    setDeletedActionId(0)
  }

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
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => setExpandTags(!expandTags)}>Expand Tags</Button>
              <Button variant="outlined" onClick={() => setExpandContexts(!expandContexts)}>Expand Contexts</Button>
            </Stack>
        </Box>
        {/* todo: decide if I want to keep this divider */}
        <Divider/>
        {actions?.data?.map(action => (
          <Action
            // id={`Action_${action.id}`}
            key={`Action_${action.id}`}
            action={action}
            showProjectName={true} // todo: should i always show this ?
            showTags={expandTags}
            showContexts={expandContexts}
          />
        ))}
      </Stack>
      <ConfirmationDialog
        open={Boolean(deletedActionId)}
        title={`Delete Action: ${action?.title}?`}
        onConfirm={deleteAction}
        onCancel={() => setDeletedActionId(0)}
      />
      <ConfirmationDialog
        open={Boolean(completedActionId)}
        title={`Delete Action: ${action?.title}?`}
        onConfirm={deleteAction}
        onCancel={() => setDeletedActionId(0)}
      />
    </PageLayout>
  )
}
