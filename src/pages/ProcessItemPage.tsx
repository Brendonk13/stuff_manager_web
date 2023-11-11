
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from "zod"
import * as React from 'react'
//import Box from '@mui/material/Box'
import { Typography, Button, Box, Stack} from '@mui/material'
import { FormProvider, useForm, useFieldArray, type FieldArrayWithId } from "react-hook-form"
import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { type Step, StepSchema } from "@/types/schemas"
import { CreateItemSchema, type CreateItem } from "@/types/ProcessItem"
import ControlledTextField from "@/forms/ControlledTextField"
import NestedTagsArray from "@/forms/NestedTagsArray"
import ControlledCheckBox from "@/forms/ControlledCheckBox"
import ActionableForm from "@/components/processItem/ActionableStepsForm"


const defaultTag = {value: ""}

const defaultStep: Step = {
  title: "",
  description: "",
  tags: [defaultTag],
  requiredContext: [defaultTag],
  somedayMaybe: false,
  cannotBeDoneYet: false,
  delegate: false,
  date: ""
}

export default function ProcessItemPage() {
  // const [activeStep, setActiveStep] = React.useState(0);
  // const [skipped, setSkipped] = React.useState(new Set<number>());
  const { openSnackbar } = useSnackbarContext()

  const { methods, defaultValues } = setupForm()
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitted, isValid, dirtyFields },
  } = methods

  const { fields, remove, append } = useFieldArray({ control, name: "steps" })

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const submittedData = data
      console.log("========================= SUBMIT ============================= ")
      console.log(data)
      if (submittedData.steps.length > 1){
        // This will be done on the backend?
        submittedData.isProject = true
      }

      // const newItemId = mutateAsync await createContact(data)
      openSnackbar({ message: 'Item Processed', type: 'success' })
      // onClose()
      // reset(defaultValues)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      console.log("form ERROR", err)
      openSnackbar({
        message:
          error.response?.data.message ?? 'Error: Unable to Process item',
        type: 'error',
      })
    }
  }


  return (
    <Box sx={{ width: '100%', padding: 2, }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
      <Stack spacing={3}>
        <ControlledTextField
          control={control}
          name="title"
          label="Title"
          TextFieldProps={{
            sx: {
              width: '50%',
            }
          }}
        />
        <ControlledTextField
          control={control}
          name="description"
          label="Description"
          TextFieldProps={{
            sx: {
              width: '50%',
            }
          }}
        />
        <Button variant="contained" sx={{alignItems: "start", width: "25%" }}>
          <Typography variant="subtitle1">
            Not Actionable (takes you to diff page)
          </Typography>
        </Button>
        <ActionableForm
          fields={fields}
          // control={control}
          append={append}
          defaultStep={defaultStep}
          defaultValues={defaultValues}
        />
        <ControlledCheckBox
          control={control}
          label={<Typography variant="subtitle1">Project ?</Typography>}
          // if not isProject, this is a project
          defaultValue={defaultValues.isProject}
          name="isProject"
        />
        <Button type="submit" variant="contained">
          submit
          {/* <Typography variant="h2"> */}
          {/* SUBMIT */}
          {/* </Typography> */}
        </Button>
      </Stack>
      </FormProvider>
    </Box>
  )
}



function setupForm(){
  const defaultValues: CreateItem = {
    title: "",       // this can be loaded from db
    description: "", // this can be loaded from db
    // todo: this isnt actually in the form, since we go to a diff form for these
    steps: [defaultStep], // if .length > 1, this is a project
    isProject: false,
    // specificDate: "",
    // maybe this should only be for the individual steps
    // tags: [defaultTag],
  }


  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   register,
  //   formState: { errors, isSubmitted, isValid, dirtyFields },

  const methods = useForm({
    defaultValues,
    // todo: re-add zod !!
    resolver: zodResolver(CreateItemSchema),
  })

  return {
    defaultValues,
    methods
    // control,
    // handleSubmit,
    // reset,
    // register,
    // formState: { errors, isSubmitted, isValid, dirtyFields },
  }
}
