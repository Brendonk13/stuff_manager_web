import { Button, Box, Stack, Collapse, Typography, IconButton } from '@mui/material'
import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from "react-hook-form"
import DoDisturbIcon from '@mui/icons-material/DoDisturb'

import ConfirmationDialog from "@/dialogs/ConfirmationDialog"
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


export default function ProjectDetailsPage(){
  const { mutateAsync: editProject } = useEditProject()

  const [expanded, setExpanded] = useState(true)

  const [showEditProjectForm, setShowEditProjectForm] = useState(false)

  const [completedActionId, setCompletedActionId] = useState(0)
  const [deletedActionId,   setDeletedActionId] = useState(0)

  useDraggableAction({setCompletedActionId, setDeletedActionId})

  const {data: action} = useGetAction(deletedActionId)

  const { projectId } = useParams()
  const { data: project } = useGetProject(Number(projectId))
  console.log({project})

  const listActionQueryParams = defaultActionQueryParams
  listActionQueryParams.project_id = Number(projectId)
  const actions = useListActions(listActionQueryParams)

  const methods = useForm({
    defaultValues: defaultProject,
    resolver: zodResolver(EditProjectSchema),
  })

  const {
    control,
    handleSubmit,
    formState: { errors, },
  } = methods

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
                value: project?.name,
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
                value: project?.notes,
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
                aria-label="show more"
              >
              </ExpandMore>
            </Stack>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography sx={{padding: 2}}>{project?.notes || ""}</Typography>
            </Collapse>
          </>
        )}

          {/* list of actions in the project */}
          {/* todo: be able to toggle showing tags */}
        {actions?.data?.map(action => (
          <Action key={`Action_${action.id}`} action={action} showTags={false} showContexts={false}/>
        ))}
        </FormProvider>
      </Box>
        <ConfirmationDialog
          open={Boolean(deletedActionId)}
          title={`Delete Action: ${action?.title}?`}
          onConfirm={deleteAction}
          onCancel={() => setDeletedActionId(0)}
        />
    </PageLayout>
  )
}
