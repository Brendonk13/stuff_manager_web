import { Link, Paper, Typography, Button, Box, Stack, Divider } from '@mui/material'
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import lightning from "@/assets/lightning_bolt_yellow.svg"
import lightning0 from "@/assets/lightning_bolt_yellow.png"
import lightning1 from "@/assets/lightning_bolt_yellow_1.png"
import lightning2 from "@/assets/lightning_bolt_yellow_2.png"
import lightning3 from "@/assets/lightning_bolt_yellow_3.png"
import lightning4 from "@/assets/lightning_bolt_yellow_4.png"
import lightning5 from "@/assets/lightning_bolt_yellow_5.png"
import lightning6 from "@/assets/lightning_bolt_yellow_6.png"
import lightning7 from "@/assets/lightning_bolt_yellow_7.png"
import lightning8 from "@/assets/lightning_bolt_yellow_8.png"
import lightning9 from "@/assets/lightning_bolt_yellow_9.png"
import lightning10 from "@/assets/lightning_bolt_yellow_rocket.png"
//import {  } from '@mui/icons-material'

interface ActionProps {
  action: any
  showProjectName?: boolean
}

function getEnergySymbol(energy: number){
  switch (energy) {
    case null : return lightning0
    case 0    : return lightning0
    case 1    : return lightning1
    case 2    : return lightning2
    case 3    : return lightning3
    case 4    : return lightning4
    case 5    : return lightning5
    case 6    : return lightning6
    case 7    : return lightning7
    case 8    : return lightning8
    case 9    : return lightning9
    case 10   : return lightning10
  }
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
              <Typography variant="h3">{action?.title || ""}</Typography>
              <Typography variant="body1">{action?.description || ""}</Typography>
            </Stack>
          </Stack>

          {/* ================== RIGHT elements ================== */}
          <Stack sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
            <img src={getEnergySymbol(action.energy)} alt="energy" style={{ height: 35, width: 24 }} />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}
