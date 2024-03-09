import { Button, Stack, Paper, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import PageLayout from "@/layouts/Page"
import ConfirmationDialog from "@/dialogs/ConfirmationDialog"
import useListUnprocessed from "@/hooks/api/useListUnprocessed"
import useDeleteUnprocessed from "@/hooks/api/useDeleteUnprocessed"

export default function UnprocessedPage() {
  const navigate = useNavigate()
  const unprocessed = useListUnprocessed()
  const { mutateAsync: deleteUnprocessed } = useDeleteUnprocessed()
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false)
  const [deletedUnprocessedId, setDeletedUnprocessedId] = useState(0)

  const deleteUnprocessedItem = async () => {
    if (deletedUnprocessedId === 0){
      console.log("deletedUnprocessedId is still zero for some reason")
      return
    }
    const result = await deleteUnprocessed(deletedUnprocessedId)
    console.log("DELETE UNPROCESSED", {result})
    setConfirmDeleteDialogOpen(false)
    setDeletedUnprocessedId(0)
  }

  const deleteClicked = (unprocessedId: number) => {
    setDeletedUnprocessedId(unprocessedId)
    setConfirmDeleteDialogOpen(true)
  }

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
                <Button size="small" variant="contained" color="error" onClick={() => deleteClicked(unprocessed.id)}>
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
            {/* todo: is it better to have this ConfirmationDialog in every loop or to set the state of the id we want to delete */}
          <ConfirmationDialog
            open={confirmDeleteDialogOpen}
            onConfirm={deleteUnprocessedItem}
            onCancel={() => setConfirmDeleteDialogOpen(false)}
            title="Delete Unprocessed Item?"
          />
          </Stack>
        )
      })}
    </div>
  )
}
