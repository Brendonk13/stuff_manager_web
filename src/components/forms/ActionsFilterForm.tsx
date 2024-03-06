import { useEffect } from "react"
import { Stack, Typography, Collapse, Button, Box, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material"
import { useContext, type SyntheticEvent } from 'react'
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import ControlledSelect from "@/components/controlled/ControlledSelect"
import ControlledSlider from "@/components/controlled/ControlledSlider"
import ExpandMore from "@/components/common/ExpandMore"
import { useNavigate } from 'react-router-dom'

import useBackListener from "@/hooks/useBackListener"
import { useFormContext } from "react-hook-form"
import { defaultActionQueryParams, defaultAction, defaultProject as _defaultProject, type Project, type Action, type Tag, type ListActionQueryParams } from "@/types/Action"
import useListProjects from "@/hooks/api/useListProjects"
import useListActions from "@/hooks/api/useListActions"
import useListTags from "@/hooks/api/useListTags"
import useListContexts from "@/hooks/api/useListContexts"
import { addUid } from "@/utils/uID"
import { tagsStringToArray } from "@/utils/random/convertTagsQueryParams"

function getOptionLabel(option: string | Project | Action | Tag){
  // console.log("============================================================getoptionlabel", {option}, "name", option?.name)
  if (typeof option === "string"){
    return option
  }
  return option?.name ?? option?.title ?? option?.value
}

type ActionsFilterFormProps = {
  showing: boolean
  setShowing: React.Dispatch<React.SetStateAction<boolean>>
  initialFormValues: ListActionQueryParams
  // filteredActions: any[] // tbh I should have each filter be independant as far as autocomplete goes
  // actions: any[] // Note: can pass in actions from parent to only search thru actions meeting current filter criteria and not all actions every time
}

function extractProjectId(e: SyntheticEvent, option: string | object) {
    console.log("==============================", {option})
    option = option.id
    return option?.id
}

export default function ActionsFilterForm({
    showing,
    setShowing,
    initialFormValues,
  }: ActionsFilterFormProps){
  const navigate = useNavigate();
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

  let defaultContexts = tagsStringToArray(contextOptions, initialFormValues?.required_context)
  // console.log("returned defaultContexts: ", {defaultContexts})
  defaultContexts = (!defaultContexts || !defaultContexts.length) ? defaultValue : defaultContexts[0]
  // console.log("defaultContexts", defaultContexts)

  useEffect(() => { setValue("title", defaultTitle) }, [setValue, defaultTitle])
  useEffect(() => { setValue("project_id", defaultProject) }, [setValue, defaultProject])
  useEffect(() => { setValue("energy", defaultEnergy) }, [setValue, defaultEnergy])
  useEffect(() => { setValue("tags", defaultTags) }, [setValue, defaultTags])
  useEffect(() => {
    setValue("required_context", defaultContexts)
    console.log("set contexts", {defaultContexts})
  }, [setValue, defaultContexts])

  // console.log({defaultTitle})

  window.addEventListener("popstate", () => {
    // todo: re-submit the form when this happens
    console.log("BACK CLICKED")
  })

  // useBackListener(({ location }) => {
  //   console.log("Navigated Back", { location })
  //   navigate("-1", { replace: true })
  // })


  const handleExpandClick = () => { setShowing(!showing) }

  const keyPrefix = "Action_Filter"
  // console.log({initialFormValues})

  // todo: maybe have option to just view all actions in projects
  // todo: should someday_maybe, delegated be in tags or seperate (checkboxes)
  // todo: be able to save queries ?
  return (
    <>
      <Stack padding={0} direction="row" sx={{alignItems: "center"}}>
        <Typography variant="h4">Filters</Typography>
        <ExpandMore
          expand={showing}
          onClick={handleExpandClick}
          aria-expanded={showing}
          aria-label="show more"
        >
        </ExpandMore>
      </Stack>
      <Collapse in={showing}>

        <Stack padding={2}>
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
              // value: defaultTitle,
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
              // value: defaultProject,
            }}
          />
          <br />

          <ControlledSlider
            control={control}
            label="Energy"
            name="energy"
            SliderProps={{
              // value: defaultEnergy,
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
              // value: defaultTags,
            }}
          />
          <br />

          <ControlledAutoComplete
            placeholder="Contexts"
            control={control}
            name="required_context"
            label=""
            getOptionLabel={getOptionLabel}
            options={contextOptions}
            getOptionKey={option => `${keyPrefix}_contexts_${addUid(option.value)}`}
            //multiple={true}  // todo: change
            AutoCompleteProps={{
              sx: { width: '60%', },
              // value: defaultContexts,
              defaultValue: null,
            }}
          />

      </Stack>

      <Button type="submit">Search</Button>
      </Collapse>
    </>
  )
}
