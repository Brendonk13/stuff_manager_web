import { Stack, Collapse, Typography, IconButton } from '@mui/material'
import { useState } from "react"

import ExpandMore from "@/components/common/ExpandMore"
import PageLayout from "@/layouts/Page"
import { useParams } from 'react-router-dom'
import useGetProject from "@/hooks/api/useGetProject"
import useListActions from "@/hooks/api/useListActions"
import { defaultActionQueryParams } from "@/types/Action"
import Action from "@/components/common/Action"


export default function ProjectDetailsPage(){
  const [expanded, setExpanded] = useState(true)

  const { projectId } = useParams()
  // name, notes, id
  const { data: project } = useGetProject(Number(projectId))
  console.log({project})
  // project.notes = "notes"

  const listActionQueryParams = defaultActionQueryParams
  listActionQueryParams.project_id = Number(projectId)
  const actions = useListActions(listActionQueryParams)
  console.log("PROJECT", {project})
  // project: id, name, notes
  // -- need to also show all actions associated with this project

  const handleExpandClick = () => { setExpanded(!expanded) }

  // todo: be able to edit notes and names from here
  return (
    <PageLayout>
        <Typography variant="h2">{project?.name || ""}</Typography>
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
        {actions?.data?.map(action => <Action key={`Action_${action.id}`} action={action} />)}
    </PageLayout>
  )
}
