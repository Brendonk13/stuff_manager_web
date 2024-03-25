import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
// import { useState, useMemo } from "react"
// import { useState } from "react"
import { Stack, Box, Button } from "@mui/material"

import ControlledTextField from "@/components/controlled/ControlledTextField"
import PageLayout from "@/layouts/Page"
import useListProjects from "@/hooks/api/useListProjects"
import Project from "@/components/common/Project"
import useCreateProject from "@/hooks/api/useCreateProject"
import { defaultProject, ProjectSchema, type Project as ProjectType } from "@/types/Project"


export default function ProjectsPage(){

  // const [createNewProject, setCreateNewProject] = useState(false)
  const { mutateAsync: createProject } = useCreateProject()


  const projects = useListProjects()
  // const projects = useMemo(() => useListProjects(), [])
  console.log("projects", projects?.data)

  const methods = useForm({
    defaultValues: defaultProject,
    resolver: zodResolver(ProjectSchema),
  })

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, },
  } = methods

  if (Object.keys(errors).length > 0){
    console.log("EDIT ACTION FORM ERRORS", {errors}, {values: getValues()})
  }

  const onSubmit = async (data: ProjectType) => {
    try {
      console.log({data})
      await createProject(data)
    } catch (e) {
      console.error(e)
    }
  }

  // todo: decide what to show here
  // ie: show just name and descriptions of projects then click to view more details?
  // or do we do it like tallo where its an infinite scroll then you click projects to view a drop down of info
  // THE ANSWER is dependant on what data we care about for projects

  // todo: be able to create a project here
  return (
    <PageLayout>
      <Stack
        direction="row"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        padding={1}
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "flex-start"
        }}
      >
        <ControlledTextField
          control={control}
          name="name"
          label="Project Name"
         />
        <Button variant="contained" sx={{transform: 'translateY(28%)', }} type="submit">Create New</Button>
      </Stack>

      <br />

      {projects?.data && projects?.data?.map(project => (
        <Project
          key={project.id}
          project={project}
        />
      ))}
    </PageLayout>
  )
}
