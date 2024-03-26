import { type Tag } from "@/types/Tag"
// import { Grid, Typography, TextField, Box } from "@mui/material"
import { IconButton, TextField, InputLabel, Box, Grid, Stack, InputAdornment } from "@mui/material"

interface TagProps {
  tags?: Tag[]
}

export default function Tags({tags}: TagProps){

  return (
    <Box sx={{ flexDirection: "column", flexGrow: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
      <Grid container sx={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
      {/* <Grid container columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}> */}
        {tags && tags.map(tag => {
          return (
            <Grid item key={tag.id} padding={1} >
            {/* <Grid item key={tag.id} padding={1} xs={3} sm={3}> */}
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
