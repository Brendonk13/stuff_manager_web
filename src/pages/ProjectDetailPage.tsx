import { Button, Box, Stack, Collapse, Typography, IconButton } from '@mui/material'
import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from "react-hook-form"
import { useQueryClient } from '@tanstack/react-query'

import ControlledTextField from "@/components/controlled/ControlledTextField"
import useEditProject from "@/hooks/api/useEditProject"
import { defaultProject, type Project, EditProjectSchema } from "@/types/Action"
import ExpandMore from "@/components/common/ExpandMore"
import PageLayout from "@/layouts/Page"
import { useParams } from 'react-router-dom'
import useGetProject from "@/hooks/api/useGetProject"
import useListActions from "@/hooks/api/useListActions"
import { defaultActionQueryParams } from "@/types/Action"
import Action from "@/components/common/Action"


export default function ProjectDetailsPage(){
  const { mutateAsync: editProject } = useEditProject()
  const [expanded, setExpanded] = useState(true)
  const [showEditProjectForm, setShowEditProjectForm] = useState(false)
  const queryClient = useQueryClient()

  // const [editName, setEditName] = useState(false)
  // const [editNotes, setEditNotes] = useState(false)

  const { projectId } = useParams()
  // name, notes, id
  const { data: project } = useGetProject(Number(projectId))
  console.log({project})
  // project.notes = "notes"

  const listActionQueryParams = defaultActionQueryParams
  listActionQueryParams.project_id = Number(projectId)
  const actions = useListActions(listActionQueryParams)
  // project: id, name, notes
  // -- need to also show all actions associated with this project

  const handleExpandClick = () => { setExpanded(!expanded) }


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
      data.id = Number(projectId)
      // make it keep name/notes if not specified
      data.name = data.name ? data.name : project.name
      data.notes = data.notes ? data.notes : project.notes
      console.log("========================= SUBMIT ============================= ", {data})

      await editProject(data)
      queryClient.invalidateQueries({ queryKey: ["getProject", Number(data.id)] })
    } catch (e) {
      console.error(e)
    }
  }

  // todo: when click edit, the button says "save changes" (and changes color to green?)
  // todo: when click edit, the collapse goes away?

  const getNameWidth = (name?: string) => {
    // makes sure that the textfield is big enough to show the name
    return name ? `${name.length * 4}%` : "70%"
  }

  // next: make button have different funcitons
  // maybe have title in the middle and have edit on the left?
  // todo: make edit button not flex grow vertically along with title when make screen less vertical
  return (
    <PageLayout>
      <Box sx={{ width: '100%', padding: 2, }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
        <Stack direction="row" sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
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
          {showEditProjectForm ? (
            <Button
              variant="contained"
              onClick={() => setShowEditProjectForm(!showEditProjectForm)} // how do I make this submit and change state
            >
              Save
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              onClick={() => setShowEditProjectForm(!showEditProjectForm)}
            >
              Edit
            </Button>
          )}
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
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
              </ExpandMore>
            </Stack>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {/* todo: change from saying "default notes" */}
              <Typography sx={{padding: 2}}>{project?.notes || "default notes"}</Typography>
            </Collapse>
          </>
        )}
        {actions?.data?.map(action => (
          <Action key={`Action_${action.id}`} action={action} />
        ))}
        </FormProvider>
      </Box>
    </PageLayout>
  )
}
