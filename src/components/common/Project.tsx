import { Link, Paper, Typography, Button, Box, Stack, Divider } from '@mui/material'
import { type Project } from "@/types/Action"
import { Link as RouterLink, useNavigate } from "react-router-dom"

interface ProjectProps {
  project: Project
}

export default function Project({project}: ProjectProps){
  const navigate = useNavigate()

  let notes = ""
  if (project?.notes){
    notes = project.notes.substring(0, 256)
  }

  const onNameClick = () => {
    navigate(`${project.id}`)
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
              <Link component={RouterLink} to={`/projects/${project.id}`} underline="none" color="grey.700">
                <Typography onClick={onNameClick} variant="h3">{project?.name || ""}</Typography>
              </Link>
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
