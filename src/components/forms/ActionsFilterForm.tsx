import { useEffect } from "react"
import z from "zod"
import { Stack, Typography, Collapse, Button } from "@mui/material"
// import { type SyntheticEvent } from 'react'
import { useFormContext } from "react-hook-form"


import OrderByAction from "@/components/forms/OrderByAction"
// import ControlledSelect from "@/components/controlled/ControlledSelect"
import ControlledSwitch from "@/components/controlled/ControlledSwitch"
import ControlledCheckbox from "@/components/controlled/ControlledCheckBox"
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
// import ControlledSelect from "@/components/controlled/ControlledSelect"
import ControlledSlider from "@/components/controlled/ControlledSlider"
import ExpandMore from "@/components/common/ExpandMore"
import { orderByOptions as orderByOptionsInput, defaultActionQueryParams, listActionQuerySchemaObject, type ListActionQueryParams } from "@/types/Action/ListAction"
import { type Action } from "@/types/Action/Action"
import { type Tag } from "@/types/Tag"
import { defaultProject as _defaultProject, type Project } from "@/types/Project/Project"
import useListProjects from "@/hooks/api/useListProjects"
import useListActions from "@/hooks/api/useListActions"
import useListTags from "@/hooks/api/useListTags"
import useListContexts from "@/hooks/api/useListContexts"
import { addUid } from "@/utils/uID"
import { tagsStringToArray } from "@/utils/random/convertTagsQueryParams"

function getOptionLabel(option: string | Project | Action | Tag){
  if (typeof option === "string"){
    return option
  }
  return option?.name ?? option?.name ?? option?.value
}

type ActionsFilterFormProps = {
  showing: boolean
  setShowing: React.Dispatch<React.SetStateAction<boolean>>
  initialFormValues: ListActionQueryParams
}

export default function ActionsFilterForm({
    showing,
    setShowing,
    initialFormValues,
  }: ActionsFilterFormProps){

  const { control, setValue } = useFormContext()
  // defaultValue is null so that its not in the query string
  const defaultValue = null

  const actions  = useListActions(defaultActionQueryParams)?.data ?? [defaultValue]
  const {data: tags}     = useListTags()
  const {data: projects} = useListProjects()
  const {data: contexts} = useListContexts()

  // should all of these be in a useeffect ?
  const actionNameOptions = actions.map(action => action?.name)
  const projectOptions    = projects ?? [defaultValue]
  const tagOptions        = tags ?? [defaultValue]
  const contextOptions    = contexts ?? [defaultValue]

  const orderByOptions = []
  // (orderByOption : z.infer<typeof listActionQuerySchemaObject.orderBy>) => {
  Object.keys(orderByOptionsInput).map(orderByOption => {
    // orderByOptions.push({
    //   value: orderByOption,
    //   ascending: true,
    // })
    orderByOptions.push(orderByOption)
  })
  // console.log({orderByOptions})

  const defaultName = initialFormValues?.name ?? ""
  const defaultCompleted = initialFormValues?.completed ?? null
  const defaultDeleted = initialFormValues?.deleted ?? null
  const defaultOrderBy = initialFormValues?.orderBy ?? null
  console.log({defaultOrderBy})
  let defaultEnergy = defaultValue
  if (initialFormValues?.energy !== null) {
    defaultEnergy = Number(initialFormValues.energy)
  }

  let defaultProject = _defaultProject
  if (initialFormValues?.project_id !== null){
    const tmp = projectOptions.filter(project =>  project?.id == initialFormValues.project_id)
    // if we find a project with the id from the URL (initialFormValues), then set it as the default form value
    if (tmp.length > 0){
      defaultProject = tmp[0]
    }
  }

  // returning an array of arrays
  let defaultTags = tagsStringToArray(tagOptions, initialFormValues?.tags)
  // console.log("returned defaultTags: ", {defaultTags})
  defaultTags = (!defaultTags || !defaultTags.length) ? defaultValue : defaultTags[0]
  // console.log("defaultTags", defaultTags)

  // let defaultContexts = tagsStringToArray(contextOptions, initialFormValues?.required_context)
  let defaultContexts = tagsStringToArray(contextOptions, initialFormValues?.contexts)
  // console.log("returned defaultContexts: ", {defaultContexts})
  defaultContexts = (!defaultContexts || !defaultContexts.length) ? defaultValue : defaultContexts[0]
  // console.log("defaultContexts", defaultContexts)

  useEffect(() => { setValue("completed", defaultCompleted)},       [ setValue, defaultCompleted])
  useEffect(() => { setValue("deleted", defaultDeleted)},           [ setValue, defaultDeleted])
  useEffect(() => { setValue("order_by", defaultOrderBy)},          [ setValue, defaultOrderBy])
  useEffect(() => { setValue("name", defaultName)},                 [ setValue, defaultName])
  useEffect(() => { setValue("project_id", defaultProject)},        [ setValue, defaultProject])
  useEffect(() => { setValue("energy", defaultEnergy)},             [ setValue, defaultEnergy])
  useEffect(() => { setValue("tags", defaultTags)},                 [ setValue, defaultTags])
  // useEffect(() => { setValue("required_context", defaultContexts)}, [ setValue, defaultContexts])
  useEffect(() => { setValue("contexts", defaultContexts)}, [ setValue, defaultContexts])


  const handleExpandClick = () => { setShowing(!showing) }

  const keyPrefix = "Action_Filter"

  // todo: maybe have option to just view all actions in projects
  // todo: should someday_maybe, delegated be in tags or seperate (checkboxes)
  // todo: be able to save queries ?
  return (
    <>
      <Stack padding={0} direction="row" sx={{alignItems: "center"}}>
        <Typography sx={{cursor: 'pointer'}} onClick={handleExpandClick} variant="h4">Filters</Typography>
        <ExpandMore
          expand={showing}
          onClick={handleExpandClick}
          aria-expanded={showing}
          aria-label="show more"
        >
        </ExpandMore>
      </Stack>
      <Stack>
        <Collapse in={showing}>

          <ControlledAutoComplete
            placeholder="Name"
            label="Name"
            control={control}
            name="name"
            getOptionLabel={getOptionLabel}
            getOptionKey={option => `${keyPrefix}_name_${addUid(option)}`}
            options={actionNameOptions}
            AutoCompleteProps={{
              sx: { width: '60%', },
            }}
          />
          <br/>

          <ControlledAutoComplete
            placeholder="Project"
            label="Project"
            control={control}
            name="project_id"
            getOptionLabel={getOptionLabel}
            options={projectOptions}
            AutoCompleteProps={{
              sx:{ width: '60%', },
            }}
          />
          <br />

          <ControlledSlider
            control={control}
            label="Energy"
            name="energy"
            SliderProps={{
              min: -1,
              step: 1,
              max: 10,
              sx: { width: '60%', },
              marks: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({label: i, value: i, }))
            }}
          />
          <br />

          <ControlledAutoComplete
            placeholder="Tags"
            label="Tags"
            control={control}
            name="tags"
            getOptionLabel={getOptionLabel}
            options={tagOptions}
            getOptionKey={option => `${keyPrefix}_tags_${addUid(option.value)}`}
            // multiple={true} // todo: make this work, will require some thought since need to change types to an array even [null] which is annoying
            AutoCompleteProps={{
              sx: { width: '60%', },
              // defaultValue: null,
            }}
          />
          <br />

          <ControlledAutoComplete
            placeholder="Contexts"
            label="Contexts"
            control={control}
            name="contexts"
            getOptionLabel={getOptionLabel}
            options={contextOptions}
            getOptionKey={option => `${keyPrefix}_contexts_${addUid(option.value)}`}
            //multiple={true}  // todo: change
            AutoCompleteProps={{
              sx: { width: '60%', },
              // defaultValue: null,
            }}
          />

          {/* todo: figure out how to click anywhere, not just on box */}
          {/* <Stack paddingX={0} spacing={-2}> */}
          {/* <Stack spacing={-5}> */}
          <ControlledCheckbox
            control={control}
            name="completed"
            label="Completed"
            sx={{
              transform: "scale(1.1)",
              p: 1,
              color: "#1677ff",
            }}
            CheckboxProps={{ style: {color: "#1677ff"}, }}
          />
          {/* <br style={{lineHeight:"1px"}}/> */}
          {/* <hr style={{height:"-3px", visibility:"hidden"}} /> */}

          <br />
          {/* <div style={{lineHeight:"30%"}}> */}
          {/* </div> */}

          <ControlledCheckbox
            control={control}
            name="deleted"
            label="Deleted"
            sx={{
              transform: "scale(1.1)",
              p: 1,
              color: "#1677ff",
            }}
            CheckboxProps={{ style: {color: "#1677ff"}, }}
          />
          {/* </Stack> */}

          {/* <Stack direction="row"> */}
          {/*   <ControlledAutoComplete */}
          {/*     placeholder="Order By" */}
          {/*     label="Order By" */}
          {/*     control={control} */}
          {/*     name="orderBy" */}
          {/*     getOptionLabel={getOptionLabel} */}
          {/*     options={Object.values(orderByOptions)} */}
          {/*     getOptionKey={option => `${keyPrefix}_orderBy_${addUid(option.value)}`} */}
          {/*     //multiple={true}  // todo: change */}
          {/*     AutoCompleteProps={{ */}
          {/*       sx: { width: '35%', }, */}
          {/*       // defaultValue: null, */}
          {/*     }} */}
          {/*   /> */}

          {/*   <ControlledSwitch */}
          {/*     control={control} */}
          {/*     name="orderByAscending" */}
          {/*     label="Ascending" */}
          {/*   /> */}

          {/* </Stack> */}

            <OrderByAction
              fieldArrayName="orderBy"
              label="orderBy"
              options={orderByOptions}
            />

          <br />
          <Button variant="contained" sx={{width:"60%"}} type="submit">Search</Button>
        </Collapse>
      </Stack>
      {showing && <br />}
    </>
  )
 }

// {/* <ControlledSelect */}
// {/*   control={control} */}
// {/*   options={[{label: "ascending", value: "ascending"}, {label: "descending", value: "descending"}]} */}
// {/*   name="orderByAscending" */}
// {/* /> */}

// {/* <ControlledCheckbox */}
// {/*   control={control} */}
// {/*   name="orderByAscending" */}
// {/*   label="Ascending" */}
// {/*   sx={{ */}
// {/*     transform: "scale(1.1)", */}
// {/*     p: 1, */}
// {/*     color: "#1677ff", */}
// {/*   }} */}
// {/*   CheckboxProps={{ style: {color: "#1677ff"}, }} */}
// {/* /> */}

