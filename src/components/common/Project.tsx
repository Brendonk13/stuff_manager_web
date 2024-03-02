import { Link, Paper, Typography, Button, Box, Stack, Divider } from '@mui/material'
import { type Project } from "@/types/Action"

interface ProjectProps {
  project: Project
}

export default function Project({project}: ProjectProps){

  let notes = ""
  if (project?.notes){
    notes = project.notes.substring(0, 256)
  }

  return (
    <Stack padding={1}>
      {/* <Paper sx={{ padding: 2, bgcolor: "action.disabled" }}> */}
      <Paper elevation={2} sx={{ padding: 1 }}>
      {/* <Paper elevation={2}> */}
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>

          {/* ================== LEFT elements ================== */}
          <Stack>
            <Stack sx={{paddingX: 1}}>
              <Typography variant="h3">{project?.name || ""}</Typography>
              <Typography variant="body1">{notes || ""}</Typography>
            </Stack>
          </Stack>

          {/* ================== RIGHT elements ================== */}
          {/* <Stack sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}> */}
          {/* </Stack> */}
        </Stack>
      </Paper>
    </Stack>
  )
}
