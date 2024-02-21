import { Stack, Typography, Collapse, Button, Box, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material"
import type { SyntheticEvent } from 'react'
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import { useFormContext } from "react-hook-form"
import { type Project, defaultAction, defaultProject } from "@/types/Action"
import useListProjects from "@/hooks/api/useListProjects"
import ExpandMore from "@/components/common/ExpandMore"
//import MailIcon from '@mui/icons-material/MailIcon';
//import InboxIcon from '@mui/icons-material/InboxIcon';

function getOptionLabel(option: string | Project){
  // console.log("============================================================getoptionlabel", {option}, "name", option?.name)
  if (typeof option === "string"){
    return option
  }
  return option.name
}

type ActionsFilterFormProps = {
  showing: boolean
  setShowing: React.Dispatch<React.SetStateAction<boolean>>
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
  //const [drawerOpen, setDrawerOpen] = useState(false);
  const { control } = useFormContext()
  const projects = useListProjects()
  const options = projects?.data ?? [defaultProject]

  // changeMe to 
  // const handleExpandClick = () => { setExpanded(!expanded) }
  const handleExpandClick = () => { setShowing(!showing) }

  // todo: dont use drawer, make my own component for the filters thats just a box that is hidden by default
  return (
    <>
      {/* <Button onClick={() => setShowing(!showing)}>button !!!!</Button> */}
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

        <ControlledAutoComplete
          placeholder="Project"
          control={control}
          name="project_id"
          label=""
          // getOptionKey={extractProjectId}
          getOptionLabel={getOptionLabel}
          // createFilterOptions={() => createFilterOptions<string | Project>}
          options={options}
          // filterOptions={addNewProjectToOptions}
          onChange={extractProjectId}
          AutoCompleteProps={{ sx:{ width: '60%', } }}
        />
      <Button type="submit">Submit</Button>
      </Collapse>
    </>
  )
}
