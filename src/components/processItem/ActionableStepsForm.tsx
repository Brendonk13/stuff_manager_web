//import * as React from 'react'
//import Box from '@mui/material/Box'
import { Typography, Button, Box, Stack} from '@mui/material'
import { useFormContext } from "react-hook-form"
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
// import { type Tag } from "@/types/Common"
// import { type Step, StepSchema } from "@/types/schemas"
// import { CreateItemSchema } from "@/types/ProcessItem"
import ControlledTextField from "@/forms/ControlledTextField"
import NestedTagsArray from "@/forms/NestedTagsArray"
import ControlledCheckBox from "@/forms/ControlledCheckBox"


export default function ActionableStepsForm({
  fields,
  defaultValues,
  // control,
  // register,
  // errors,
  append,
  defaultStep,
}: {
    fields: any,
    defaultValues: any,
    // control: any,
    // register: any,
    // errors: any,
    append: any,
    defaultStep: any,
}){
  const { control, register, formState: {errors,}, } = useFormContext()
  return (
      <>
        <Typography variant="h2"> Actionable Steps </Typography>
        <Stack spacing={5}>
          {fields.map((field, index: number) => {
            console.log(index)
            // todo: add a stack for showing all the fields in a step (title, description, tags, date
              // todo: do steps have dates or ? -- yes
              // todo: how to group each step together visually
            return (
              <Box key={`Actions_${index}`} padding={2} sx={{
                borderRadius: '8px',
                borderStyle: true ? 'solid' : 'dashed',
                backgroundColor: '#fafafa',
                color: '#bdbdbd',
                outline: 'none',
              }}>
                <Stack sx={{justifyContent: "space-between" }} spacing={2} direction="row">
                  <ControlledTextField
                    control={control}
                    // name={`steps.${index}.title`}
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
                    name={`steps[${index}].date`}
                    label="Date"
                  // todo: make this a drop down
                    TextFieldProps={{
                      sx: {
                        width: '100%',
                        padding: 1,
                      }
                    }}
                  />
                  <ControlledCheckBox
                    control={control}
                    label={<Typography variant="subtitle1">Someday/Maybe ?</Typography>}
                    // if not isProject, this is a project
                    defaultValue={defaultValues.somedayMaybe}
                    name={`steps[${index}].somedayMaybe`}
                  />
                  <ControlledCheckBox
                    control={control}
                    label={<Typography variant="subtitle1">Cannot be done yet ?</Typography>}
                    // if not isProject, this is a project
                    defaultValue={defaultValues.cannotBeDoneYet}
                    name={`steps[${index}].cannotBeDoneYet`}
                  />
                  <ControlledCheckBox
                    control={control}
                    label={<Typography variant="subtitle1">Delegate ?</Typography>}
                    // if not isProject, this is a project
                    defaultValue={defaultValues.delegate}
                    name={`steps[${index}].delegate`}
                  />
                </Stack>
                <ControlledTextField
                  control={control}
                  // name={`steps.${index}.description`} // todo: how THEFUCK do I do a list of these all with diff names in a form, they shouldn't have a name since its the array of them that has a name ....
                  name={`steps[${index}].description`} // todo: how THEFUCK do I do a list of these all with diff names in a form, they shouldn't have a name since its the array of them that has a name ....
                  label="Description"
                  TextFieldProps={{
                    sx: {
                      width: '80%',
                      padding: 1,
                    }
                  }}
                />
              <NestedTagsArray
                parentName="steps"
                nestIndex={index}
                control={control}
                register={register}
                errors={errors}
                label="Tags"
                name="tags"
                // key="tags"
              />
              <NestedTagsArray
                // key="requiredContext"
                parentName="steps"
                nestIndex={index}
                control={control}
                register={register}
                errors={errors}
                name="requiredContext"
                label="Required context"
              />
            </Box>
            )
          })
          }
          <Button sx={{ width: "50%" }} onClick={() => append(defaultStep) }>
          Add Step
          </Button>
        </Stack>
      </>
    )
}
