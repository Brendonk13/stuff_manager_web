import { type Tag } from "@/types/Tag"
// import { Grid, Typography, TextField, Box } from "@mui/material"
import { IconButton, TextField, InputLabel, Box, Grid, Stack, InputAdornment } from "@mui/material"

interface TagProps {
  tags?: Tag[]
}

export default function Tags({tags}: TagProps){

  return (
    <Box sx={{ flexDirection: "column", flexGrow: 1 }}>
      <Grid container>
        {tags && tags.map(tag => {
          return (
            <Grid key={tag.id} padding={1}>
              <Box
                component="section"
                sx={{
                  p: 1,
                  border: "2px solid grey",
                  borderRadius: 1,
                }}>
                {tag.value}
            </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
