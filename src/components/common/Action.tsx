import { Link, Paper, Typography, Stack } from '@mui/material'
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import lightning from "@/assets/lightning_bolt_yellow.svg"
//import {  } from '@mui/icons-material'
import getEnergySymbol from "@/utils/random/getEnergySymbol"
import Tags from "@/components/common/Tags"

interface ActionProps {
  action: any
  showProjectName?: boolean
}

export default function Action({action, showProjectName}: ActionProps){

  // todo: add an info icon for: created, tags, required_contexts, project name
  // this slides in additional info, making each action bigger
  //
  // add hyperlink to project: use an icon, when you hover it shows the project name?
  return (
    <Stack padding={1}>
      {/* <Paper sx={{ padding: 2, bgcolor: "action.disabled" }}> */}
      <Paper elevation={2} sx={{ padding: 1 }}>
      {/* <Paper elevation={2}> */}
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>

          {/* ================== LEFT elements ================== */}
          <Stack>
            {showProjectName && action?.project?.name && (
              <Link href={`/projects/${action.project.project_id}`} color="secondary" underline="always">
                {action.project.name}
              </Link>
            )}
            {/* I have this stack so that the link above will appear in the top left without padding but below stack is padded */}
            {/* todo: figure out what padding looks good */}
            <Stack sx={{paddingX: 1}}>
              <Link href={`/actions/${action.id}`} color="text.primary">
                <Typography variant="h3">{action?.title || ""}</Typography>
              </Link>
              <Typography variant="body1">{action?.description || ""}</Typography>
            </Stack>
          </Stack>

          {/* ================== RIGHT elements ================== */}
          <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
          {/* <Stack direction="row"> */}
            {/* todo: make this be optional to show and also make it a grid, not a row */}
            {/* make it expandable but also show in a grid with contexts appearing underneath maybe */}
            <Tags tags={action?.tags ?? []} />
            <img src={getEnergySymbol(action.energy)} alt="energy" style={{ height: 35, width: 24 }} />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}
