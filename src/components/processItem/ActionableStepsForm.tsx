//import * as React from 'react'
import { createFilterOptions, Typography, Button, Box, Stack, Divider, IconButton, Paper, InputLabel } from '@mui/material'
import { useFormContext, useFieldArray } from "react-hook-form"
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
import ControlledTextField from "@/components/controlled/ControlledTextField"
import NestedTagsArray from "@/forms/NestedTagsArray"
import ControlledCheckBox from "@/components/controlled/ControlledCheckBox"
import ControlledDatePicker from "@/components/controlled/ControlledDatePicker"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import ControlledSlider from "@/components/controlled/ControlledSlider"
import useListProjects from "@/hooks/api/useListProjects"
import { type Project, defaultStep, defaultProject} from "@/types/Action"
import { type Option } from "@/types/Common"


function getOptionLabel(option: string | Project){
  // console.log("============================================================getoptionlabel", {option}, "name", option?.name)
  if (typeof option === "string"){
    return option
  }
  return option.name
}

// filterOptions={(options, params) => {
// function addNewProjectToOptions(options: string[] | Project[], params: any){
function addNewProjectToOptions(options: Option[], params: any){
  const filter = createFilterOptions<string | Project>()
  const filtered = filter(options, params);
  console.log("filterOptions", {options}, {params}, {filtered})

  const { inputValue, getOptionLabel } = params;
  // Suggest the creation of a new value unless they have entered an existing one
  const isExisting = options.some((option) => inputValue === getOptionLabel(option));
  if (inputValue !== '' && !isExisting) {
    filtered.push({
      ...defaultProject,
      name: `New Project: ${inputValue}`,
      realName: inputValue,
    });
  }
  console.log("AFTER", {filtered})

  return filtered;
}

function extractNewProjectName(event, chosenOption){
  const realName = chosenOption?.realName
  if (realName){
    delete chosenOption.realName
    chosenOption.name = realName
  }
}

export default function ActionableStepsForm(){
  const { control, formState: {errors,}, } = useFormContext()
  const { fields, remove, append } = useFieldArray({ control, name: "steps" })
  const projects = useListProjects()
  const options = projects?.data ?? [defaultProject]
  const filter = createFilterOptions<string | Project>();
  // console.log("options for autocomplete", {options})
  return (
      <>
        {/* <Box sx={{ display: "flex", flexDirection: "column" }}> */}
          {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}
          {/* todo: fix the spacing on this */}
            <ControlledAutoComplete
              // todo: make it more clear that this will also create a new project
              placeholder="Add to project"
              control={control}
              name="project"
              label=""
              getOptionLabel={getOptionLabel}
              // createFilterOptions={() => createFilterOptions<string | Project>}
              options={options}
              filterOptions={addNewProjectToOptions}
              onChange={extractNewProjectName}
              AutoCompleteProps={{ sx:{ width: '60%', } }}
            />
            {/* </Box> */}
            {/* </Box> */}
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
          <Typography variant="h3">Steps</Typography>
          <IconButton
            color="primary"
            onClick={() => append(defaultStep)}
          >
            <AddIcon />
          </IconButton>
        </Stack>

        {/*  ======================== STEPS ======================== */}
        <Stack spacing={5}>
          {fields.map((field, index) => {
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
                  sx={{ marginTop: 2 , marginBottom: 3, borderBottomWidth: 1 }}
                />

                {/* =========== Metadata =========== */}
                  {/* todo: make this stand out less */}
                <ControlledSlider
                  control={control}
                  label="Energy"
                  name={`steps[${index}].energy`}
                  min={0}
                  step={1}
                  max={10}
                  // color="secondary" // to make it grey
                  sx={{
                      width: '60%',
                      //opacity: "90%",
                  }}
                  marks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({
                    label: i,
                    value: i
                  }))}
                />
                <Box padding={1} >
                  <ControlledDatePicker
                    control={control}
                    label="Date"
                    name={`steps[${index}].date`}
                    />
                </Box>
                <Stack padding={1}>
                  <ControlledCheckBox
                    control={control}
                    label="Someday/Maybe ?"
                    defaultValue={defaultStep.somedayMaybe}
                    name={`steps[${index}].somedayMaybe`}
                  />
                  <ControlledCheckBox
                    control={control}
                    label="Cannot be done yet ?"
                    defaultValue={defaultStep.cannotBeDoneYet}
                    name={`steps[${index}].cannotBeDoneYet`}
                  />
                  <ControlledCheckBox
                    control={control}
                    label="Delegate ?"
                    defaultValue={defaultStep.delegate}
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
      <br/>
    </>
  )
}
