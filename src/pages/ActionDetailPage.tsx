import { FormControlLabel, Checkbox, Link, Divider, Button, Box, Stack, Collapse, Typography, IconButton } from '@mui/material'
import { useState, useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from "react-hook-form"
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import dayjs from "dayjs"
import { Link as RouterLink } from "react-router-dom"

import ActionCompletionNotesDialog from "@/dialogs/ActionCompletionNotesDialog"
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
import { defaultAction, type Action } from "@/types/Action/Action"
import { EditActionSchema } from "@/types/Action/EditAction"
import { defaultProject } from "@/types/Project/Project"
// import ExpandMore from "@/components/common/ExpandMore"
import PageLayout from "@/layouts/Page"
import { useParams } from 'react-router-dom'
import useGetAction from "@/hooks/api/useGetAction"
import useEditAction from "@/hooks/api/useEditAction"


export default function ActionDetailsPage(){
  const { mutateAsync: editAction } = useEditAction()
  const [showEditAction, setShowEditAction] = useState(false)
  const [showActionCompletedDialog, setShowActionCompletedDialog] = useState(false)

  let { actionId } = useParams()
  actionId = Number(actionId)
  const { data: action } = useGetAction(actionId)

  const {data: projects} = useListProjects()
  const projectOptions = projects ?? [defaultProject]

  const {data: tags} = useListTags()
  const tagOptions = tags ?? [defaultTag]

  const {data: contexts} = useListContexts()
  const contextOptions = contexts ?? [defaultTag]

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
    reset,
  } = methods

  if (Object.keys(errors).length > 0){
    console.log("EDIT ACTION FORM ERRORS", {errors}, {values: getValues()})
  }

  useEffect(() => setValue('id', action?.id ?? 0),
    [setValue, action?.id])

  // useEffect(() => setValue('title', action?.title ?? ""),
  //   [setValue, action?.title])
  useEffect(() => {
    console.log("edit titl, current: ", action?.title)
    setValue('title', action?.title ?? "")
  }, [setValue, action?.title])

  useEffect(() => setValue('description', action?.description ?? ""),
    [setValue, action?.description])

  useEffect(() => setValue('deletedDate', action?.deletedDate ?? null),
    [setValue, action?.deletedDate])

  useEffect(() => setValue('completedDate', action?.completedDate ?? null),
    [setValue, action?.completedDate])

  useEffect(() => setValue('completed', action?.completed ?? false),
    [setValue, action?.completed])
    // [setValue, action?.completed, showEditAction])

  useEffect(() => setValue('deleted', action?.deleted ?? false),
    [setValue, action?.deleted])

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
      console.log("========================= SUBMIT ============================= ", {data}, {values: getValues()})

      // const newlyMarkedDeleted = action?.deleted === false && data.deleted === true
      const newlyMarkedCompleted = action?.completed === false && data.completed === true
      if (data?.energy === -1){
        data.energy = null
      }
      // if (newlyMarkedDeleted
      const newAction = await editAction(data)
      console.log({newAction})

      // if was not completed, now is completed, prompt for notes
      if (newlyMarkedCompleted){
        setShowActionCompletedDialog(true)
      }

    } catch (e) {
      console.error(e)
      // setShowEditAction(true)
    }
  }

  const onCancel = () => {
    setShowEditAction(!showEditAction)
    reset(action)
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
              aria-label="Save"
              onClick={() => setShowEditAction(!showEditAction)}
            >
              {showEditAction ? "Save" : "Edit"}
            </Button>
            {/* cancel -- dont save changes */}
            { showEditAction && (
              <IconButton aria-label="Cancel" onClick={onCancel}>
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
          </>
        }
        {/* {action?.project && <br />} */}

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

          <br />
          <ControlledCheckbox
            control={control}
            name="deleted"
            label="Deleted"
            disabled={!showEditAction}
            sx={{
              transform: "scale(1.2)",
              p: 1,
              color: "#1677ff",
            }}
            CheckboxProps={{ style: {color: "#ff4d4f"}, }}
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
        <ActionCompletionNotesDialog
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
