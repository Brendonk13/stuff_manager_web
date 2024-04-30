import { Link, Collapse, Paper, Typography, Stack } from '@mui/material'
import { useState } from "react"
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import lightning from "@/assets/lightning_bolt_yellow.svg"
//import {  } from '@mui/icons-material'
import getEnergySymbol from "@/utils/random/getEnergySymbol"
import Tags from "@/components/common/Tags"
import ExpandMore from "@/components/common/ExpandMore"

interface ActionProps {
  action: any
  showProjectName?: boolean
  showTags: boolean
  showContexts: boolean
}

export default function Action({action, showProjectName, showTags: showTagsProp, showContexts: showContextProp}: ActionProps){

  const [showTags, setShowTags] = useState(showTagsProp)
  const [showContexts, setShowContexts] = useState(showContextProp)


  // todo: add an info icon for: created, tags, required_contexts, project name
  // this slides in additional info, making each action bigger
  // add hyperlink to project: use an icon, when you hover it shows the project name?

  return (
    <Stack padding={1}>
      {/* <Paper sx={{ padding: 2, bgcolor: "action.disabled" }}> */}
      <Paper elevation={2} sx={{ padding: 1 }} id="swipeable_action" data-actionId={action?.id}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>

          {/* ================== LEFT elements ================== */}
          <Stack>
            {showProjectName && action?.project?.name && (
              <Link href={`/projects/${action.project.project_id}`} color="secondary" underline="always">
                {action.project.name}
              </Link>
            )}
            {/* I have this stack so that the link above will appear in the top left without padding but below stack is padded */}
            {/* todo: figure out what padding looks good */}
            <Stack sx={{paddingX: 1}}>
              <Link href={`/actions/${action.id}`} color="text.primary">
                <Typography variant="h3">{action?.name || ""}</Typography>
              </Link>
              <Typography variant="body1">{action?.description || ""}</Typography>
            </Stack>
          </Stack>

          {/* ================== RIGHT elements ================== */}
          <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}} spacing={1}>
              {/* use stack so that expand is above the list of tags */}
            <Stack >
              <Stack direction="row" sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                <Typography onClick={() => setShowTags(!showTags)} sx={{cursor: 'pointer'}} variant="h5">Tags</Typography>
                <ExpandMore
                  expand={showTags || showTagsProp}
                  onClick={() => setShowTags(!showTags)}
                  aria-expanded={showTags}
                  aria-label="Show tags"
                >
                </ExpandMore>
              </Stack>
              {/* todo: make this be optional to show and also make it a grid, not a row */}
              {/* make it expandable but also show in a grid with contexts appearing underneath maybe */}
              <Collapse in={showTags || showTagsProp}>
                <Tags tags={action?.tags ?? []} displayOnRight={true}/>
              </Collapse>
            </Stack>

            <Stack>
              {/* use stack so that expand is above the list of contexts */}
              <Stack direction="row" sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                <Typography onClick={() => setShowContexts(!showContexts)} sx={{cursor: 'pointer'}} variant="h5">Contexts</Typography>
                <ExpandMore
                  expand={showContexts || showContexts}
                  onClick={() => setShowContexts(!showContexts)}
                  aria-expanded={showContexts}
                  aria-label="Show contexts"
                >
                </ExpandMore>
              </Stack>
              {/* todo: make this be optional to show and also make it a grid, not a row */}
              {/* make it expandable but also show in a grid with contexts appearing underneath maybe */}
              <Collapse in={showContexts || showContextProp}>
                {/* <Tags tags={action?.required_context ?? []} displayOnRight={true}/> */}
                <Tags tags={action?.contexts ?? []} displayOnRight={true}/>
              </Collapse>
            </Stack>
            <img src={getEnergySymbol(action.energy)} alt="energy" style={{ height: 35, width: 24 }} loading="lazy"/>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}
