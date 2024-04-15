import { Button, Box, Stack, Collapse, Typography, IconButton } from '@mui/material'
import { useState, useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from "react-hook-form"
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import dayjs from "dayjs"

import ActionCompletedDialog from "@/dialogs/ActionCompletedDialog"
import ActionDeletedDialog from "@/dialogs/ActionDeletedDialog"
// import ConfirmationDialog from "@/dialogs/ConfirmationDialog"
import useDraggableAction from "@/hooks/useDraggableAction"
import ControlledTextField from "@/components/controlled/ControlledTextField"
import useEditProject from "@/hooks/api/useEditProject"
import { EditProjectSchema } from "@/types/Project/EditProject"
import { defaultProject, type Project } from "@/types/Project/Project"
import ExpandMore from "@/components/common/ExpandMore"
import PageLayout from "@/layouts/Page"
import { useParams } from 'react-router-dom'
import useGetProject from "@/hooks/api/useGetProject"
import useListActions from "@/hooks/api/useListActions"
import useGetAction from "@/hooks/api/useGetAction"
import { defaultActionQueryParams } from "@/types/Action/ListAction"
import Action from "@/components/common/Action"
import useEditAction from "@/hooks/api/useEditAction"
import { type EditActionBody } from "@/types/Action/EditAction"


export default function ProjectDetailsPage(){
  const { mutateAsync: editProject } = useEditProject()

  const [expanded, setExpanded] = useState(true)

  const [showEditProjectForm, setShowEditProjectForm] = useState(false)

  const [expandTags, setExpandTags] = useState(false)
  const [expandContexts, setExpandContexts] = useState(false)

  const [completedActionId, setCompletedActionId] = useState(0)
  const [deletedActionId,   setDeletedActionId] = useState(0)

  const { mutateAsync: editAction } = useEditAction()
  const {data: deletedAction} = useGetAction(deletedActionId)
  const {data: completedAction} = useGetAction(completedActionId)

  useDraggableAction({setCompletedActionId, setDeletedActionId})

  const { projectId } = useParams()
  const { data: project } = useGetProject(Number(projectId))
  console.log({project})

  const listActionQueryParams = {...defaultActionQueryParams, project_id: Number(projectId)}
  // listActionQueryParams.project_id = Number(projectId)
  const {data: actions} = useListActions(listActionQueryParams)

  const methods = useForm({
    defaultValues: defaultProject,
    resolver: zodResolver(EditProjectSchema),
  })

  const {
    control,
    handleSubmit,
    formState: { errors, },
    setValue,
  } = methods

  useEffect(() => setValue('id', project?.id ?? 0),
    [setValue, project?.id])

  useEffect(() => setValue('name', project?.name ?? ""),
    [setValue, project?.name])

  useEffect(() => setValue('notes', project?.notes ?? ""),
    [setValue, project?.notes])

  if (Object.keys(errors).length > 0){
    console.log("EDIT PROJECT FORM ERRORS", {errors})
  }

  const onSubmit = async (data: Project) => {
    try {
      const formattedData = {
        id: Number(projectId),
        name: data.name ? data.name : project.name,
        notes: data.notes ? data.notes : project.notes,
      }
      console.log("========================= SUBMIT ============================= ", {formattedData})

      await editProject(formattedData)
      // queryClient.invalidateQueries({ queryKey: ["getProject", Number(formattedData.id)] })
    } catch (e) {
      console.error(e)
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
      // title: action.title,
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


  const getNameWidth = (name?: string) => {
    // makes sure that the textfield is big enough to show the name
    return name ? `${name.length}ch` : "70%"
  }

  return (
    <PageLayout>
      <Box sx={{ width: '100%', padding: 2, }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>

        {/* name or edit name textfield */}
        <Stack direction="row" sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}>
          {showEditProjectForm ? (
            <ControlledTextField
              control={control}
              name="name"
              label="Project Name"
              TextFieldProps={{
                sx: {
                  width: getNameWidth(project?.name),
                },
              }}
            />
          ) : (
            <Typography variant="h2">{project?.name || ""}</Typography>
          )}

        {/* name or edit name textfield */}
            <Stack direction="row" spacing={1}>
              <Button
                type={showEditProjectForm ? "button" : "submit"} // idk why reverse doesnt work
                variant="contained"
                onClick={() => setShowEditProjectForm(!showEditProjectForm)}
              >
                {showEditProjectForm ? "Save" : "Edit"}
              </Button>
              {/* cancel -- dont save changes */}
              { showEditProjectForm && (
                <IconButton onClick={() => setShowEditProjectForm(!showEditProjectForm)}>
                  <DoDisturbIcon sx={{color: 'error.main' }}/>
                </IconButton>
              )}
            </Stack>
        </Stack>

        {showEditProjectForm ? (
          <>
            <br />
            <ControlledTextField
              control={control}
              name="notes"
              label="Project Notes"
              TextFieldProps={{
                multiline: true,
                minRows: 2,
                sx: {
                  width: '60%',
                }
              }}
            />
            <br />
          </>
        ) : (
          <>
            <Stack padding={0} direction="row" sx={{alignItems: "center"}}>
              <Typography variant="h4" sx={{padding: 2}}>Notes</Typography>
              <ExpandMore
                expand={expanded}
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label="show notes"
              >
              </ExpandMore>
            </Stack>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography sx={{padding: 2}}>{project?.notes || ""}</Typography>
            </Collapse>
          </>
        )}
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={toggleTags}>Expand Tags</Button>
              <Button variant="outlined" onClick={toggleContexts}>Expand Contexts</Button>
            </Stack>

          {/* list of actions in the project */}
          {/* todo: be able to toggle showing tags */}
        {actions?.map(action => (
          <Action
            key={`Action_${action.id}`}
            action={action}
            showTags={expandTags}
            showContexts={expandContexts}
          />
        ))}
        </FormProvider>
      </Box>
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
