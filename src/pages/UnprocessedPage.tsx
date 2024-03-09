import { Button, Stack, Paper, Typography } from '@mui/material'
import useListUnprocessed from "@/hooks/api/useListUnprocessed"
import { useNavigate } from "react-router-dom"

import PageLayout from "@/layouts/Page"

export default function UnprocessedPage() {
  const navigate = useNavigate()
  const unprocessed = useListUnprocessed()
  console.log({unprocessed})
  return (
    <div>
      <Typography variant="h2">Unprocessed Items</Typography>
      <br/>
      {unprocessed?.data?.map(unprocessed => {
        return (
        <Stack key={unprocessed.id} padding={1} sx={{display: "flex" }}>
          {/* <Paper elevation={2} sx={{  padding: 1 }}> */}
          <Paper elevation={2} sx={{   padding: 1 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              {/* left side */}
              <Stack>
                <Typography variant="h3">{unprocessed?.title ?? ""}</Typography>
                <Typography variant="body1">{unprocessed?.description ?? ""}</Typography>
              </Stack>

              {/* right side */}
                {/* note: can make them go in the top right by removing alignItems and setting sx=height="60%" */}
              <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                <Button size="small" variant="contained" color="error">
                    {/* <Typography><strong>Delete</strong></Typography> */}
                    {/* <Typography>Delete</Typography> */}
                    Delete
                </Button>
                <Button size="small" variant="contained" onClick={() => navigate(`/stuff/new/${unprocessed.id}`)}>
                {/* <Button size="small" variant="contained" sx={{height: "60%"}} onClick={() => navigate(`/stuff/new/${unprocessed.id}`)}> */}
                  {/* <Typography><strong>Process</strong></Typography> */}
                  {/* <Typography>Process</Typography> */}
                  Process
                </Button>
              </Stack>
            </Stack>
          </Paper>
          </Stack>

        )
      })}
    </div>
  )
}
