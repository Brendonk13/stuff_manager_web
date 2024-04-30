// import React from "react";
import { useFieldArray } from "react-hook-form"
import { IconButton, InputLabel, Box, Grid, Stack, InputAdornment } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { useFormContext } from "react-hook-form"

import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import { defaultTag, type Tag } from "@/types/Tag"
import { addUid } from "@/utils/uID"
import ControlledTextField from "@/components/controlled/ControlledTextField"
import CloseWindowImage from "@/assets/icons8-close-window-24.png"


interface NestedTagsArrayProps {
  // parentName: string, // only used for making fieldArrayName
  // nestIndex: number, // only used for id
  // name: string, // only used for id
  fieldArrayName: string,
  label: string,
  options: Tag[],
}

// export default function NestedTagsArray(
//   { parentName, nestIndex, name, label }
//   : {
//     parentName: string,
//     nestIndex: number,
//     name: string,
//     label: string,
// }) {

export default function NestedTagsArray(
  {
    fieldArrayName,
    label,
    // options = [defaultTag],
    options,
  } : NestedTagsArrayProps) {
  const { control, } = useFormContext()
  // const fieldArrayName = `${parentName}[${nestIndex}].${name}`

  // console.log({options})

  const { fields, remove, append } = useFieldArray({
    control,
    name: fieldArrayName,
  })
  // todo: make the tags look cool (also make sure we always show this in alphabetically sorted order
  return (
    <>
      <Stack direction="row">
        {/* ====== ADD TAG BUTTON ====== */}
        <InputLabel sx={{padding: 1, alignSelf: "center"}} id={addUid(fieldArrayName)}>{label}</InputLabel>
        <IconButton color="primary" onClick={() => append(defaultTag)}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Box key={addUid(fieldArrayName)} sx={{ flexDirection: "column", flexGrow: 1 }}>
        <Grid container sx={{ flexGrow: 1}} spacing={2}>
          {/* Loop over tags */}
          {fields.map((item, index) => {
            // console.log("fieldname", `${fieldArrayName}[${index}].value`)
            return (
              <Grid item key={item.id} xs={6} zeroMinWidth>
                {/* useFieldArray needs something with this id for remove to work: https://github.com/react-hook-form/react-hook-form/issues/1571#issuecomment-690882455 */}
                <ControlledAutoComplete
                  // placeholder=
                  control={control}
                  name={`${fieldArrayName}[${index}]`}
                  // getOptionLabel={(option: Tag) => {
                  getOptionLabel={option => {
                    // console.log("getOptionLabel", {option}, {options})
                    return option !== "" ? option.value : defaultTag.value
                  }}
                  label="Tag"
                  options={options}
                  AutoCompleteProps={{
                    sx:{ width: '100%', },
                  }}
                  // TextFieldProps={{
                  //   sx: {
                  //     width: '100%',
                  //     // padding: 1,
                  //   },}}
                  InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => remove(index)} color="secondary"
                              sx={{
                                // alignSelf: "flex-end",
                                // justifySelf: "flex-end",
                                float: "right",
                                position: 'absolute',
                                left: '91%',
                                top: '-8%',
                              }}
                            >
                              <Box
                                component="img"
                                sx={{
                                  borderRadius: 10,
                                }}
                                src={CloseWindowImage}
                                alt="Close"
                              />
                          </IconButton>
                        </InputAdornment>
                      ),
                  }}
            />
          </Grid>
          )
        })}
        </Grid>
      </Box>
  </>
  )
}
