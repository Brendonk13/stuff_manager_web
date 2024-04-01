import { useEffect } from "react"
import { Stack, Typography, Collapse, Button } from "@mui/material"
// import { type SyntheticEvent } from 'react'
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
// import ControlledSelect from "@/components/controlled/ControlledSelect"
import ControlledSlider from "@/components/controlled/ControlledSlider"
import ExpandMore from "@/components/common/ExpandMore"

import { useFormContext } from "react-hook-form"
import { defaultActionQueryParams, type Action, type ListActionQueryParams } from "@/types/Action"
import { type Tag } from "@/types/Tag"
import { defaultProject as _defaultProject, type Project } from "@/types/Project"
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
  return option?.name ?? option?.title ?? option?.value
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
  const tags     = useListTags()
  const projects = useListProjects()
  const contexts = useListContexts()

  // should all of these be in a useeffect ?
  const actionTitleOptions = actions.map(action => action?.title)
  const projectOptions     = projects?.data ?? [defaultValue]
  const tagOptions         = tags?.data ?? [defaultValue]
  const contextOptions     = contexts?.data ?? [defaultValue]

  const defaultTitle = initialFormValues?.title ?? ""
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
  let defaultContexts = tagsStringToArray(contextOptions, initialFormValues?.requiredContext)
  // console.log("returned defaultContexts: ", {defaultContexts})
  defaultContexts = (!defaultContexts || !defaultContexts.length) ? defaultValue : defaultContexts[0]
  // console.log("defaultContexts", defaultContexts)

  useEffect(() => { setValue("title", defaultTitle)},               [ setValue, defaultTitle])
  useEffect(() => { setValue("project_id", defaultProject)},        [ setValue, defaultProject])
  useEffect(() => { setValue("energy", defaultEnergy)},             [ setValue, defaultEnergy])
  useEffect(() => { setValue("tags", defaultTags)},                 [ setValue, defaultTags])
  // useEffect(() => { setValue("required_context", defaultContexts)}, [ setValue, defaultContexts])
  useEffect(() => { setValue("requiredContext", defaultContexts)}, [ setValue, defaultContexts])


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
            control={control}
            name="title"
            label=""
            getOptionLabel={getOptionLabel}
            getOptionKey={option => `${keyPrefix}_name_${addUid(option)}`}
            options={actionTitleOptions}
            AutoCompleteProps={{
              sx: { width: '60%', },
            }}
          />
          <br/>

          <ControlledAutoComplete
            placeholder="Project"
            control={control}
            name="project_id"
            label=""
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
            control={control}
            name="tags"
            label=""
            getOptionLabel={getOptionLabel}
            options={tagOptions}
            getOptionKey={option => `${keyPrefix}_tags_${addUid(option.value)}`}
            // multiple={true} // todo: make this work, will require some thought since need to change types to an array even [null] which is annoying
            AutoCompleteProps={{
              sx: { width: '60%', },
              defaultValue: null,
            }}
          />
          <br />

          <ControlledAutoComplete
            placeholder="Contexts"
            control={control}
            // name="required_context"
            name="requiredContext"
            label=""
            getOptionLabel={getOptionLabel}
            options={contextOptions}
            getOptionKey={option => `${keyPrefix}_contexts_${addUid(option.value)}`}
            //multiple={true}  // todo: change
            AutoCompleteProps={{
              sx: { width: '60%', },
              defaultValue: null,
            }}
          />


          <br />
          <Button variant="contained" sx={{width:"60%"}} type="submit">Search</Button>
        </Collapse>
      </Stack>
      {showing && <br />}
    </>
  )
}
