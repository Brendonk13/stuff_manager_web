import React from "react";
import { useFieldArray } from "react-hook-form"
import { Button, Typography, InputLabel, Box, Grid, Paper, Stack, styled } from "@mui/material"
import ControlledTextField from "@/forms/ControlledTextField"
import { useFormContext } from "react-hook-form"


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
      <Stack spacing={2} direction="row">
        <InputLabel id={`${name}_${nestIndex}`}>{label}</InputLabel>
        <Button
          onClick={() =>
            append({
              value: "",
            })
          }
        >
          Add {label}
        </Button>
      </Stack>
      <Box key={`${name}_${nestIndex}_box`} sx={{ flexDirection: "column", flexGrow: 1 }}>
        <Grid container>
          {/* Loop over tags */}
          {fields.map((item, index) => {
            // console.log("fieldname", `${fieldArrayName}[${index}].value`)
            return (
            <Grid key={`${name}_${index}_grid`}>
              <ControlledTextField
                control={control}
                // name={`${fieldArrayName}.${index}.value`}
                name={`${fieldArrayName}[${index}].value`}
                // label="Tags"
              // todo: make this a drop down
                TextFieldProps={{
                  sx: {
                    width: '100%',
                    padding: 1,
                  }
                }}
              />
              {/* todo: make this appear as an X in the top corner of the tag textfield */}
              {/* todo: why does this always only delete the last one instead of the deleted one */}
              <Button onClick={() => remove(index)}>
                Remove {label}
              </Button>
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
