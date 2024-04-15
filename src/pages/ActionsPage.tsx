import { AxiosError } from 'axios'
import { useState, useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, Box, Stack, Button } from "@mui/material"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import dayjs from 'dayjs'

import { convertOrderByToArray, convertOrderByToString } from "@/utils/convertOrderBy"
import ActionCompletedDialog from "@/dialogs/ActionCompletedDialog"
import ActionDeletedDialog from "@/dialogs/ActionDeletedDialog"
import useDraggableAction from "@/hooks/useDraggableAction"
import Action from "@/components/common/Action"
import PageLayout from "@/layouts/Page"
import { useSnackbarContext } from '@/contexts/SnackbarContext'
import useListActions from "@/hooks/api/useListActions"
import useGetAction from "@/hooks/api/useGetAction"
import ActionsFilterForm from "@/components/forms/ActionsFilterForm"
import convertTags from "@/utils/random/convertTagsQueryParams"
import { defaultOrderby, defaultActionQueryParams, ListActionQuerySchema, type ListActionQueryParams } from "@/types/Action/ListAction"
import { type EditActionBody } from "@/types/Action/EditAction"
import useEditAction from "@/hooks/api/useEditAction"

function cleanupFormData(data){
  if (data?.title === ""){
    data.title = null
  }
  if (data?.project_id === 0){
    data.project_id = null
  }
}

function convertFormDataToAPIQueryString(data) {
  console.log("cleanup forma data", data?.orderBy)
  cleanupFormData(data)

  if (data?.tags){
    data.tags = convertTags(data.tags)
  }
  if (data?.requiredContext){
    data.requiredContext = convertTags(data.requiredContext)
  }
  if (data?.orderBy){
    console.log("cleanup form data found order by", {data})
    const clean = convertOrderByToString(data.orderBy)
    data.orderBy = clean
    console.log("within, after cleanup form data found order by", {data}, {clean})
  }
}

function extractSearchParamsFromForm(formData){
  console.log("extract search params from form", formData?.orderBy)
  const params: ListActionQueryParams = {}
  // need null comparison incase user selected energy == 0
  if (formData?.energy !== null ) params.energy          = formData.energy
  if (formData?.title           ) params.title           = formData.title
  if (formData?.project_id      ) params.project_id      = formData.project_id
  if (formData?.completed       ) params.completed       = formData.completed
  if (formData?.deleted         ) params.deleted         = formData.deleted
  if (formData?.orderBy         ) params.orderBy         = convertOrderByToString(formData.orderBy)
  if (formData?.tags            ) params.tags            = convertTags(formData.tags)
  if (formData?.requiredContext ) params.requiredContext = convertTags(formData.requiredContext)

  if (params?.energy && params.energy === -1){
    // only want query params that are relevant for the query
    delete params.energy
  }
  console.log("submit", params?.orderBy, "type -> ", typeof params?.orderBy, "length", params?.orderBy?.length)
  if (params?.orderBy !== undefined && params.orderBy !== null && params.orderBy.length === 0){
    delete params.orderBy
  }
  console.log("form params", {params}, "original data:", {formData})
  return params
}

function extractSearchParamsFromURL(searchParams){
  const params: ListActionQueryParams = {}
  const energy          = searchParams.get("energy")
  const title           = searchParams.get("title")
  const project_id      = searchParams.get("project_id")
  const completed       = searchParams.get("completed")
  const deleted         = searchParams.get("deleted")
  const orderBy         = searchParams.get("orderBy")
  const tags            = searchParams.get("tags")
  const requiredContext = searchParams.get("requiredContext")
  if (energy           ) params.energy          = energy
  if (title            ) params.title           = title
  if (project_id       ) params.project_id      = project_id
  if (completed        ) params.completed       = Boolean(completed)
  if (deleted          ) params.deleted         = Boolean(deleted)
  if (orderBy          ) params.orderBy         = convertOrderByToArray(orderBy)
  if (tags             ) params.tags            = tags
  if (requiredContext  ) params.requiredContext = requiredContext

  console.log("from url", {params})
  return params
}

export default function ActionsPage(){

  const [completedActionId, setCompletedActionId] = useState(0)
  const [deletedActionId, setDeletedActionId] = useState(0)
  useDraggableAction({setCompletedActionId, setDeletedActionId})

  const [expandTags, setExpandTags] = useState(false)
  const [expandContexts, setExpandContexts] = useState(false)

  const {data: deletedAction} = useGetAction(deletedActionId)
  const {data: completedAction} = useGetAction(completedActionId)

  const [searchParams, setSearchParams] = useSearchParams()

  // this is passed to child form
  const initialFormValues = {...defaultActionQueryParams, ...extractSearchParamsFromURL(searchParams)}

  // console.log("before cleanup", {initialFormValues})
  cleanupFormData(initialFormValues)
  // console.log("after cleanup", {initialFormValues})




  const initialAPIQueryString = {...initialFormValues}
  convertFormDataToAPIQueryString(initialAPIQueryString)
  // console.log({initialAPIQueryString})

  // set query string for API based on the current URL's query string
  const [actionQueryParams, setActionQueryParams] = useState(initialAPIQueryString)

  const {data: actions} = useListActions(actionQueryParams)
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
    convertFormDataToAPIQueryString(data)
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

  // ensure that the list of actions is correct by re-computing the API query string from the new URL after back arrow
  useEffect(() => {
    window.removeEventListener("popstate", setQueryParamsFromUrl)
    window.addEventListener("popstate", setQueryParamsFromUrl)
    return () => window.removeEventListener("popstate", setQueryParamsFromUrl)
  }, [])


  const onSubmit = async (_data: typeof defaultActionQueryParams) => {
    try {
      console.log("========================= SUBMIT ============================= ", {_data})
      const data = extractSearchParamsFromForm(_data)

      console.log("new Listactions query params", {data})

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
    const actionData: EditActionBody = {
      id: completedActionId,
      completed: true,
    }
    const editedAction = await editAction(actionData)
    console.log("COMPLETED ACTION", {editedAction})
    setCompletedActionId(0)
  }

  const deleteAction = async () => {
    if (deletedActionId === 0){
      console.log("deletedActionId is still zero for some reason")
      return
    }
    const actionData: EditActionBody = {
      deletedDate: dayjs().toISOString(),
      id: deletedActionId,
    }
    const editedAction = await editAction(actionData)
    console.log("DELETED ACTION", {editedAction})
    setDeletedActionId(0)
  }

  const toggleTags = () => {
    setExpandTags(!expandTags)
  }
  const toggleContexts = () => {
    setExpandContexts(!expandContexts)
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
              <Button variant="outlined" onClick={toggleTags}>Expand Tags</Button>
              <Button variant="outlined" onClick={toggleContexts}>Expand Contexts</Button>
            </Stack>
        </Box>
        {/* todo: decide if I want to keep this divider */}
        <Divider/>
        {actions?.map(action => (
          <Action
            key={`Action_${action.id}`}
            action={action}
            showProjectName={true} // todo: should i always show this ?
            showTags={expandTags}
            showContexts={expandContexts}
          />
        ))}
      </Stack>
      <ActionDeletedDialog
        open={Boolean(deletedActionId)}
        title={deletedAction?.title ?? ""}
        onConfirm={deleteAction}
        onCancel={() => setDeletedActionId(0)}
      />
      <ActionCompletedDialog
        open={Boolean(completedActionId)}
        title={completedAction?.title ?? ""}
        onConfirm={actionCompleted}
        onCancel={() => setCompletedActionId(0)}
      />
    </PageLayout>
  )
}
