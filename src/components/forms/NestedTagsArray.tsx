import React from "react";
import { useFieldArray } from "react-hook-form"
import { Button, IconButton, Typography, InputLabel, Box, Grid, Paper, Stack, InputAdornment, Divider, styled } from "@mui/material"
import ControlledTextField from "@/components/controlled/ControlledTextField"
import { useFormContext } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import CloseWindowImage from "@/assets/icons8-close-window-24.png"


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function NestedTagsArray(
  { parentName, nestIndex, name, label }
  : {
    parentName: string,
    nestIndex: number,
    name: string,
    label: string,
}) {
  const { control, } = useFormContext()
  // const fieldArrayName = `${parentName}.${nestIndex}.${name}`
  const fieldArrayName = `${parentName}[${nestIndex}].${name}`

  const { fields, remove, append } = useFieldArray({
    control,
    name: fieldArrayName,
  })
  // todo: make the tags look cool (also make sure we always show this in alphabetically sorted order
  return (
    <>
      <Stack direction="row">
        <InputLabel sx={{padding: 1, alignSelf: "center"}} id={`${name}_${nestIndex}`}>{label}</InputLabel>
        <IconButton
          color="primary"
          onClick={() =>
            append({
              value: "",
            })
          }
        >
          {/* Add tag button */}
          <AddIcon />
        </IconButton>
      </Stack>
      <Box key={`${name}_${nestIndex}_box`} sx={{ flexDirection: "column", flexGrow: 1 }}>
        <Grid container>
          {/* Loop over tags */}
          {fields.map((item, index) => {
            // console.log("fieldname", `${fieldArrayName}[${index}].value`)
            return (
            <Grid key={item.id}>
                {/* useFieldArray needs something with this id for remove to work: https://github.com/react-hook-form/react-hook-form/issues/1571#issuecomment-690882455 */}
              <ControlledTextField
                control={control}
                name={`${fieldArrayName}[${index}].value`}
              // todo: make this a drop down
                TextFieldProps={{
                  sx: {
                    width: '100%',
                    padding: 1,
                  },
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => remove(index)} color="secondary"
                            sx={{
                              // alignSelf: "flex-end",
                              // justifySelf: "flex-end",
                              float: "right",
                              position: 'absolute',
                              left: '89%',
                              top: '-13%',
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                borderRadius: 5,
                              }}
                              src={CloseWindowImage}
                            />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
          </Grid>
          )
        })}
        </Grid>
      </Box>
  </>
  )
}

//           <div key={item.id} style={{ marginLeft: 20 }}>
//             <label>Nested Array:</label>
//             <input
//               name={`${parentName}.${nestIndex}.tags.${index}.value`}
//               ref={register({ required: true })}
//               // defaultValue={item.value}
//               style={{ marginRight: "25px" }}
//             />
//           </div>
