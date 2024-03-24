import { createFilterOptions, Typography, Button, Box, Stack, Divider, IconButton, Paper } from '@mui/material'
import { useFormContext, useFieldArray } from "react-hook-form"
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
import ControlledTextField from "@/components/controlled/ControlledTextField"
import NestedTagsArray from "@/components/forms/NestedTagsArray"
import ControlledCheckBox from "@/components/controlled/ControlledCheckBox"
import ControlledDatePicker from "@/components/controlled/ControlledDatePicker"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import ControlledSlider from "@/components/controlled/ControlledSlider"
import useListProjects from "@/hooks/api/useListProjects"
import { defaultCreateItemAction } from "@/types/Action"
import { type Project, defaultProject} from "@/types/Project"
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

  return filtered;
}

function extractNewProjectName(event, chosenOption){
  const realName = chosenOption?.realName
  if (realName){
    delete chosenOption.realName
    chosenOption.name = realName
  }
}

export default function ActionableForm(){
  const { control } = useFormContext()
  const { fields, remove, append } = useFieldArray({ control, name: "actions" })
  const projects = useListProjects()
  const options = projects?.data ?? [defaultProject]
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
          <Typography variant="h3">Actions</Typography>
          <IconButton
            color="primary"
            onClick={() => append(defaultCreateItemAction)}
          >
            <AddIcon />
          </IconButton>
        </Stack>

        {/*  ======================== ACTIONS ======================== */}
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
                    name={`actions[${index}].title`}
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
                    name={`actions[${index}].description`}
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
                  name={`actions[${index}].energy`}
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
                    name={`actions[${index}].date`}
                  />
                </Box>
                <Stack padding={1}>
                  <ControlledCheckBox
                    control={control}
                    label="Someday/Maybe ?"
                    defaultValue={defaultCreateItemAction.somedayMaybe}
                    name={`actions[${index}].somedayMaybe`}
                  />
                  <ControlledCheckBox
                    control={control}
                    label="Cannot be done yet ?"
                    defaultValue={defaultCreateItemAction.cannotBeDoneYet}
                    name={`actions[${index}].cannotBeDoneYet`}
                  />
                  <ControlledCheckBox
                    control={control}
                    label="Delegate ?"
                    defaultValue={defaultCreateItemAction.delegated}
                    name={`actions[${index}].delegated`}
                  />
                </Stack>
                <NestedTagsArray
                  fieldArrayName={`actions[${index}].tags`}
                  // parentName="actions"
                  // nestIndex={index}
                  // name="tags"
                  label="Tags"
                />
                <NestedTagsArray
                  fieldArrayName={`actions[${index}].required_context`}
                  // parentName="actions"
                  // nestIndex={index}
                  // name="required_context"
                  label="Required context"
                />
              </Box>
            </Stack>
            )
          })
          }
        </Stack>
        <Button variant="contained" sx={{alignItems: "start", width: "25%" }} onClick={() => append(defaultCreateItemAction) }>
        Add Action
        </Button>
      </Paper>
      <br/>
    </>
  )
}
