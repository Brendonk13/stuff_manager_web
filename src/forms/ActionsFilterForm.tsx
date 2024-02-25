import { Stack, Typography, Collapse, Button, Box, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material"
import type { SyntheticEvent } from 'react'
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import ControlledSelect from "@/components/controlled/ControlledSelect"
import ControlledSlider from "@/components/controlled/ControlledSlider"
import ControlledDatePicker from "@/components/controlled/ControlledDatePicker"
import ExpandMore from "@/components/common/ExpandMore"

import { useFormContext } from "react-hook-form"
import { defaultActionQueryParams, defaultAction, defaultProject, type Project, type Action, type Tag } from "@/types/Action"
import useListProjects from "@/hooks/api/useListProjects"
import useListActions from "@/hooks/api/useListActions"
import useListTags from "@/hooks/api/useListTags"
import useListContexts from "@/hooks/api/useListContexts"
import { addUid } from "@/utils/uID"

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
  }: ActionsFilterFormProps){
  const { control } = useFormContext()
  const projects = useListProjects()

  // defaultValue is null so that its not in the query string
  const defaultValue = null

  const projectOptions = projects?.data ?? [defaultValue]

  const allActions = useListActions(defaultActionQueryParams)
  const actionTitleOptions = allActions?.data ?? [defaultValue]

  const tags = useListTags()
  const tagOptions = tags?.data ?? [defaultValue]

  const contexts = useListContexts()
  const contextOptions = contexts?.data ?? [defaultValue]
  // console.log("TAGS", {tags})

  const handleExpandClick = () => { setShowing(!showing) }

  const keyPrefix = "Action_Filter"

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
          {/* should I be always searching for all actions here or just ones that fit the existing filter criteria */}
          <ControlledAutoComplete
            placeholder="Name"
            control={control}
            name="title"
            label=""
            getOptionLabel={getOptionLabel}
            getOptionKey={option => `${keyPrefix}_name_${addUid(option)}`}
            options={actionTitleOptions.map(action => action?.title)}
            AutoCompleteProps={{ sx:{ width: '60%', } }}
          />
          <br/>

          <ControlledAutoComplete
            placeholder="Project"
            control={control}
            name="project_id"
            label=""
            getOptionLabel={getOptionLabel}
            options={projectOptions}
            // onChange={extractProjectId} // I dont think I need this since I have the transform in the zod schema: ListActionQuerySchema
            AutoCompleteProps={{ sx:{ width: '60%', } }}
          />
          <br />

          {/* todo: figure out how to reset this */}
          {/* 1. could use -1 as proxy value but can only have slider display nums not null or clear*/}
          {/* could just show an X button */}
          dont like having to just reload to reset since then we gotta re-apply the other queries
          <ControlledSlider
            control={control}
            label="Energy"
            name="energy"
            SliderProps={{
              defaultValue:null, // null values not used in query string
              min: 0,
              step: 1,
              max: 10,
              sx: { width: '60%', },
              marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
                if (typeof i === "number")
                  // if (i === -1) return { label: -1, value: -1 }
                  return {
                    label: i,
                    value: i,
                  }
                return {
                  label: -1,
                  value: null,
                }
              })
            }}
          />
          <br />


          {/* {/1* todo: maybe make this a slider *1/} */}
          {/* <ControlledSelect */}
          {/*   name="energy" */}
          {/*   control={control} */}
          {/*   label="Energy" */}
          {/*   // fixme: this has a default value of null and its giving a small error */}
          {/*   options={[1,2,3,4,5,6,7,8,9,10].map(num => { return {label: String(num) ?? 0, value: num ?? 0}})} */}
          {/*   sx={{ width: "60%" }} */}
          {/* /> */}
          {/* <br/> */}

          <ControlledAutoComplete
            placeholder="Tags"
            control={control}
            name="tags"
            label=""
            getOptionLabel={getOptionLabel}
            options={tagOptions}
            getOptionKey={option => `${keyPrefix}_tags_${addUid(option.value)}`}
            // multiple={true} // todo: make this work, will require some thought since need to change types to an array even [null] which is annoying
            AutoCompleteProps={{ sx:{ width: '60%', } }}
          />
          <br />


          <ControlledAutoComplete
            placeholder="Contexts"
            control={control}
            name="requiredContext"
            label=""
            getOptionLabel={getOptionLabel}
            options={contextOptions}
            getOptionKey={option => `${keyPrefix}_contexts_${addUid(option.value)}`}
            //multiple={true}  // todo: change
            AutoCompleteProps={{ sx:{ width: '60%', } }}
          />

          {/* {/1* todo: make this work with date ranges *1/} */}
          {/* <ControlledDatePicker */}
          {/*   control={control} */}
          {/*   label="Date" */}
          {/*   name="date" */}
          {/*   sx={{ width: "60%" }} */}
          {/* /> */}

      </Stack>

      <Button type="submit">Search</Button>
      </Collapse>
    </>
  )
}
