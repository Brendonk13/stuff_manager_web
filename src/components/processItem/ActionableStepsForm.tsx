//import * as React from 'react'
import { Typography, Button, Box, Stack, Divider, IconButton, Paper } from '@mui/material'
import { useFormContext } from "react-hook-form"
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
// import { type Tag } from "@/types/Common"
// import { type Step, StepSchema } from "@/types/schemas"
// import { CreateItemSchema } from "@/types/ProcessItem"
import ControlledTextField from "@/forms/ControlledTextField"
import NestedTagsArray from "@/forms/NestedTagsArray"
import ControlledCheckBox from "@/forms/ControlledCheckBox"
import ControlledDatePicker from "@/forms/ControlledDatePicker"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ActionableStepsForm({
  fields,
  defaultValues,
  append,
  remove,
  defaultStep,
}: {
    fields: any,
    defaultValues: any,
    append: any,
    remove: any,
    defaultStep: any,
}){
  const { control, register, formState: {errors,}, } = useFormContext()
  return (
      <>
        <Paper
          key={`Actions_form`}
          elevation={2}
          sx={{
            margin: 2,
            padding: 2,
            // border: "1px solid black",
          }}
        >
        <Stack direction="row">
          <Typography variant="h2">Steps</Typography>
          <IconButton
            color="primary"
            // size="small"
            // variant="contained"
            onClick={() =>
              append(defaultStep)
            }
          >
            <AddIcon />
          </IconButton>
        </Stack>
          <Stack spacing={5}>
            {fields.map((field, index: number) => {
              // remove step button
              return (
                <Stack key={field.id}>
                  {index > 0 && <Divider sx={{borderBottomWidth:4}}/>}
                  <IconButton
                    color="primary"
                    onClick={() =>
                      remove(index)
                    }
                    //sx={{alignSelf: "flex-end", color: "text.secondary"}}
                  // todo: figure out how to align this button according to the paper element and not the stack or box
                    sx={{padding: 2, alignSelf: "flex-end", color: "error.main"}}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Box key={`Actions_${index}`} padding={2} sx={{
                    // borderStyle: true ? 'solid' : 'dashed',
                    // backgroundColor: '#fafafa',
                    // color: '#bdbdbd',
                    outline: 'none',
                  }}>
                    <ControlledTextField
                      control={control}
                      name={`steps[${index}].title`}
                      label="Title"
                      TextFieldProps={{
                        sx: {
                          width: '60%',
                          padding: 1,
                        }
                      }}
                    />
                    <ControlledTextField
                      control={control}
                      name={`steps[${index}].description`}
                      label="Description"
                      TextFieldProps={{
                        multiline: true,
                        minRows: 2,
                        sx: {
                          width: '80%',
                          padding: 1,
                        }
                      }}
                    />
                  <Divider
                    // sx={{ marginTop: !isMobile ? 2 : 'initial', marginBottom: 3 }}
                    sx={{ marginTop: 2 , marginBottom: 3, borderBottomWidth: 1 }}
                  />

                  <Box padding={1} >
                  <ControlledDatePicker
                    control={control}
                    label="Date"
                    name={`steps[${index}].date`}
                    />
                    </Box>
                    {/* <ControlledTextField */}
                    {/*   control={control} */}
                    {/*   name={`steps[${index}].date`} */}
                    {/*   label="Date" */}
                    {/*   TextFieldProps={{ */}
                    {/*     sx: { */}
                    {/*       width: '14%', */}
                    {/*       padding: 1, */}
                    {/*     } */}
                    {/*   }} */}
                    {/* /> */}
                  <Stack padding={1}>
                    {/* &nbsp;&nbsp; */}
                    <ControlledCheckBox
                      control={control}
                      // label={<Typography variant="subtitle1">Someday/Maybe ?</Typography>}
                      label="Someday/Maybe ?"
                      defaultValue={defaultValues.somedayMaybe}
                      name={`steps[${index}].somedayMaybe`}
                    />
                    {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                    <ControlledCheckBox
                      control={control}
                      // label={<Typography variant="subtitle1">Cannot be done yet ?</Typography>}
                      label="Cannot be done yet ?"
                      defaultValue={defaultValues.cannotBeDoneYet}
                      name={`steps[${index}].cannotBeDoneYet`}
                    />
                    {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                    <ControlledCheckBox
                      control={control}
                      // label={<Typography variant="subtitle1">Delegate ?</Typography>}
                      label="Delegate ?"
                      defaultValue={defaultValues.delegate}
                      name={`steps[${index}].delegate`}
                    />
              </Stack>
                  <NestedTagsArray
                    parentName="steps"
                    nestIndex={index}
                    label="Tags"
                    name="tags"
                  />
                  <NestedTagsArray
                    parentName="steps"
                    nestIndex={index}
                    name="requiredContext"
                    label="Required context"
                  />
                </Box>
              </Stack>
              )
            })
            }
          </Stack>
          <Button variant="contained" sx={{alignItems: "start", width: "25%" }} onClick={() => append(defaultStep) }>
          Add Step
          </Button>
        </Paper>
      </>
    )
}
