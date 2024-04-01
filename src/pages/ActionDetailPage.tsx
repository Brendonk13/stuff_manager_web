import { FormControlLabel, Checkbox, Link, Divider, Button, Box, Stack, Collapse, Typography, IconButton } from '@mui/material'
import { useState, useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from "react-hook-form"
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import dayjs from "dayjs"
import { Link as RouterLink } from "react-router-dom"

import ActionCompletedDialog from "@/dialogs/ActionCompletedDialog"
import ControlledCheckbox from "@/components/controlled/ControlledCheckBox"
import { defaultTag } from "@/types/Tag"
import useListTags from "@/hooks/api/useListTags"
import useListContexts from "@/hooks/api/useListContexts"
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import useListProjects from "@/hooks/api/useListProjects"
import NestedTagsArray from "@/components/forms/NestedTagsArray"
import Tags from "@/components/common/Tags"
import getEnergySymbol from "@/utils/random/getEnergySymbol"
import ControlledSlider from "@/components/controlled/ControlledSlider"
import ControlledTextField from "@/components/controlled/ControlledTextField"
// import useEditProject from "@/hooks/api/useEditProject"
// import { defaultProject, type Project, EditProjectSchema } from "@/types/Project"
import { defaultAction, EditActionSchema, type Action } from "@/types/Action"
import { defaultProject } from "@/types/Project"
import ExpandMore from "@/components/common/ExpandMore"
import PageLayout from "@/layouts/Page"
import { useParams } from 'react-router-dom'
// import useGetProject from "@/hooks/api/useGetProject"
import useGetAction from "@/hooks/api/useGetAction"
import useEditAction from "@/hooks/api/useEditAction"
// import useListActions from "@/hooks/api/useListActions"


export default function ActionDetailsPage(){
  const { mutateAsync: editAction } = useEditAction()
  // const [expanded, setExpanded] = useState(true)
  const [showEditAction, setShowEditAction] = useState(false)
  const [showActionCompletedDialog, setShowActionCompletedDialog] = useState(false)

  let { actionId } = useParams()
  actionId = Number(actionId)
  const { data: action } = useGetAction(actionId)

  const projects = useListProjects()
  const projectOptions = projects?.data ?? [defaultProject]

  const tags = useListTags()
  const tagOptions = tags?.data ?? [defaultTag]
  // console.log({tagOptions})

  const contexts = useListContexts()
  const contextOptions = contexts?.data ?? [defaultTag]
  // console.log({contextOptions})


  const methods = useForm({
    defaultValues: defaultAction,
    resolver: zodResolver(EditActionSchema),
  })

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, },
  } = methods

  if (Object.keys(errors).length > 0){
    console.log("EDIT ACTION FORM ERRORS", {errors}, {values: getValues()})
  }

  // const { fields: tagFields, remove: removeTag, append: appendTag } = useFieldArray({ control, name: "tags" })
  // const { fields: contextFields, remove: removeContext, append: appendContext } = useFieldArray({ control, name: "required_context" })
  useEffect(() => setValue('id', action?.id ?? 0),
    [setValue, action?.id])

  useEffect(() => setValue('title', action?.title ?? ""),
    [setValue, action?.title])

  useEffect(() => setValue('description', action?.description ?? ""),
    [setValue, action?.description])

  useEffect(() => setValue('completed', action?.completed ?? false),
    [setValue, action?.completed, showEditAction])
  // need to update when showEditAction is clicked to prevent changes from appearing to persist when save is not clicked

  useEffect(() => setValue('energy', action?.energy ?? -1),
    [setValue, action?.energy])

  // useEffect(() => setValue('project', action?.project ?? defaultProject),
  useEffect(() => setValue('project', action?.project ?? null),
    [setValue, action?.project])

  // todo: is this correct default value ????
  useEffect(() => setValue('tags', action?.tags ?? []),
    [setValue, action?.tags])

  // useEffect(() => setValue('required_context', action?.required_context ?? []),
  useEffect(() => setValue('requiredContext', action?.requiredContext ?? []),
    [setValue, action?.requiredContext])




  const onSubmit = async (data: Action) => {
    try {
      console.log("========================= SUBMIT ============================= ", {data})

      const newAction = await editAction(data)
      console.log({newAction})

      // if was not completed, now is completed, prompt for notes
      console.log(action?.completed, data.completed)
      if (action?.completed === false && data.completed === true){
        console.log("open comfirm dialog")
        setShowActionCompletedDialog(true)
      }

    } catch (e) {
      console.error(e)
    }
  }

  const getNameWidth = (name?: string) => {
    // makes sure that the textfield is big enough to show the name
    return name ? `${name.length}ch` : "70%"
  }

  console.log({action})

  return (
    <PageLayout>
      <Box sx={{ width: '100%', padding: 2, }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>

        <Stack direction="row" sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}>
          {/* LEFT SIDE */}
          {showEditAction ?
            <ControlledTextField
              control={control}
              name="title"
              label="Action Name"
              sx={{width: getNameWidth(action?.title)}}
            />
           : (
            <Stack direction="row" spacing={2}>
              <img src={getEnergySymbol(action?.energy ?? null)} alt="energy" style={{ height: 35, width: 24 }} />
              <Typography variant="h2">{action?.title || ""}</Typography>
            </Stack>
          )}

        {/* RIGHT SIDE */}
          <Stack direction="row" spacing={1}>
            <Button
              type={showEditAction ? "button" : "submit"} // idk why reverse doesnt work
              variant="contained"
              onClick={() => setShowEditAction(!showEditAction)}
            >
              {showEditAction ? "Save" : "Edit"}
            </Button>
            {/* cancel -- dont save changes */}
            { showEditAction && (
              <IconButton onClick={() => setShowEditAction(!showEditAction)}>
                <DoDisturbIcon sx={{color: 'error.main' }}/>
              </IconButton>
            )}
          </Stack>
        </Stack>

          <br />
            {showEditAction ?
              <>
              <ControlledTextField
                control={control}
                name="description"
                label="Description"
                TextFieldProps={{
                  multiline: true,
                  minRows: 2,
                  sx: {
                    width: '60%',
                  }
                }}
              />
            <br />
            </>
            :
              <>
                <Typography variant="h4">{action?.description || ""}</Typography>
                <br />
              </>
            }


          <Divider sx={{borderBottomWidth: 2, mb: 2}}/>

          <ControlledCheckbox
            control={control}
            name="completed"
            label="Completed"
            disabled={!showEditAction}
            sx={{
              transform: "scale(1.2)",
              p: 1,
              color: "#1677ff",
            }}
            CheckboxProps={{ style: {color: "#1677ff"}, }}
          />

          {showEditAction &&
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
          }

        {action?.project && <br />}
          { showEditAction ?
            <ControlledAutoComplete
              placeholder="Project"
              control={control}
              name="project"
              label="Project"
              getOptionLabel={option => option.name}
              options={projectOptions}
              AutoCompleteProps={{
                sx:{ width: '60%', },
              }}
            />
        : <>
            <Link href={`/projects/${action?.project?.id}`} underline="always" color="grey.700">
              {/* todo: make the clickable bounds only the text and not the whole row !!!! */}
              <Typography variant="h5">{action?.project && action.project.name}</Typography>
            </Link>
            <br />
          </>
        }
        {/* {action?.project && <br />} */}

          {action?.tags?.length === 0 && <br />}
          { showEditAction ?
            <NestedTagsArray
              fieldArrayName="tags"
              label="Tags"
              options={tagOptions}
            />
          : (
            <>
              <Typography variant="h5">Tags:</Typography>
              <Tags tags={action?.tags} />
            </>
          )}

          { showEditAction ?
            <NestedTagsArray
              fieldArrayName="requiredContext"
              label="Contexts"
              options={contextOptions}
            />
          : (
            <>
              <Typography variant="h5">Contexts:</Typography>
              <Tags tags={action?.requiredContext} />
            </>
          )
          }
          <br />


          <Typography><strong>Processed Date:</strong> {dayjs(action?.created).format('MMM D, YYYY')}</Typography>
        </FormProvider>
      </Box>
      {action?.id &&
        <ActionCompletedDialog
          open={showActionCompletedDialog}
          // open={true}
          setOpen={setShowActionCompletedDialog}
          actionId={action.id}
          actionCompletion={action?.completionNotes}
        />
      }
    </PageLayout>
  )
}
