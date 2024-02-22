import { Stack, Typography, Collapse, Button, Box, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material"
import type { SyntheticEvent } from 'react'
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import { useFormContext } from "react-hook-form"
import { defaultActionQueryParams, defaultAction, defaultProject, type Project, type Action } from "@/types/Action"
import useListProjects from "@/hooks/api/useListProjects"
import ExpandMore from "@/components/common/ExpandMore"
//import MailIcon from '@mui/icons-material/MailIcon';
//import InboxIcon from '@mui/icons-material/InboxIcon';
import useListActions from "@/hooks/api/useListActions"
import { addUid } from "@/utils/uID"

function getOptionLabel(option: string | Project | Action){
  // console.log("============================================================getoptionlabel", {option}, "name", option?.name)
  if (typeof option === "string"){
    return option
  }
  return option?.name ?? option?.title
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
    // filteredActions,
  }: ActionsFilterFormProps){
  const { control } = useFormContext()
  const projects = useListProjects()
  const projectOptions = projects?.data ?? [defaultProject]

  const allActions = useListActions(defaultActionQueryParams)
  const actionTitleOptions = allActions?.data ?? [defaultAction]
  // console.log("filter", {actions})

  const handleExpandClick = () => { setShowing(!showing) }

  // todo: dont use drawer, make my own component for the filters thats just a box that is hidden by default
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

        {/* todo: why no padding WTF */}
        <Stack padding={2}>
          {/* should I be always searching for all actions here or just ones that fit the existing filter criteria */}
          <ControlledAutoComplete
            key="action_title_search"
            placeholder="Name"
            control={control}
            name="title"
            label=""
            getOptionLabel={getOptionLabel}
            getOptionKey={option => {
              return `Action_Filter_${addUid(option)}`
            }}
            options={actionTitleOptions.map(action => action?.title)}
            AutoCompleteProps={{ sx:{ width: '60%', } }}
          />

          <ControlledAutoComplete
            key="action_project_title_search"
            placeholder="Project"
            control={control}
            name="project_id"
            label="label"
            getOptionLabel={getOptionLabel}
            options={projectOptions}
            onChange={extractProjectId} // I dont think I need this since I have the transform in the zod schema: ListActionQuerySchema
            AutoCompleteProps={{ sx:{ width: '60%', } }}
          />

      </Stack>

      <Button type="submit">Search</Button>
      </Collapse>
    </>
  )
}
