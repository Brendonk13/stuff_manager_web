import { Button, Stack, Paper, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import PageLayout from "@/layouts/Page"
import ConfirmationDialog from "@/dialogs/ConfirmationDialog"
import useListUnprocessed from "@/hooks/api/useListUnprocessed"
import useDeleteUnprocessed from "@/hooks/api/useDeleteUnprocessed"

export default function UnprocessedPage() {
  const navigate = useNavigate()
  const {data: unprocessedList} = useListUnprocessed()
  const { mutateAsync: deleteUnprocessed } = useDeleteUnprocessed()
  const [deletedUnprocessedId, setDeletedUnprocessedId] = useState(0)

  console.log({unprocessedList})

  const deleteUnprocessedItem = async () => {
    if (deletedUnprocessedId === 0){
      console.log("deletedUnprocessedId is still zero for some reason")
      return
    }
    const result = await deleteUnprocessed(deletedUnprocessedId)
    console.log("DELETE UNPROCESSED", {result})
    setDeletedUnprocessedId(0)
  }

  return (
    <PageLayout>
      <Typography variant="h2">Unprocessed Items</Typography>
      <br/>
      {unprocessedList?.map(unprocessed => {
        return (
        <Stack key={unprocessed.id} padding={1} sx={{display: "flex" }}>
          {/* <Paper elevation={2} sx={{  padding: 1 }}> */}
          <Paper elevation={2} sx={{   padding: 1 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              {/* LEFT SIDE */}
              <Stack>
                <Typography variant="h3">{unprocessed?.title ?? ""}</Typography>
                <Typography variant="body1">{unprocessed?.description ?? ""}</Typography>
              </Stack>

              {/* RIGHT SIDE */}
                {/* note: can make them go in the top right by removing alignItems and setting sx=height="60%" */}
              <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                <Button size="small" variant="contained" color="error" onClick={() => setDeletedUnprocessedId(unprocessed.id)}>
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
      <ConfirmationDialog
        open={deletedUnprocessedId !== 0}
        onConfirm={deleteUnprocessedItem}
        // onCancel={() => setConfirmDeleteDialogOpen(false)}
        onCancel={() => setDeletedUnprocessedId(0)}
        title="Delete Unprocessed Item?"
      />
    </PageLayout>
  )
}
