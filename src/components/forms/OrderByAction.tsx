// import React from "react";
import { useFieldArray } from "react-hook-form"
import { IconButton, InputLabel, Box, Grid, Stack, InputAdornment } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { useFormContext } from "react-hook-form"
import { Fragment } from "react"

// import useGetBreakpoint from "@/hooks/useGetBreakpoint"
import ControlledSwitch from "@/components/controlled/ControlledSwitch"
import ControlledAutoComplete from "@/components/controlled/ControlledAutoComplete"
import { defaultOrderby } from "@/types/Action/ListAction"
// import { defaultTag, type Tag } from "@/types/Tag"
import { addUid } from "@/utils/uID"
import ControlledTextField from "@/components/controlled/ControlledTextField"
import CloseWindowImage from "@/assets/icons8-close-window-24.png"


interface NestedTagsArrayProps {
  // parentName: string, // only used for making fieldArrayName
  // nestIndex: number, // only used for id
  // name: string, // only used for id
  fieldArrayName: string,
  label: string,
  options: object[],
}

// export default function NestedTagsArray(
//   { parentName, nestIndex, name, label }
//   : {
//     parentName: string,
//     nestIndex: number,
//     name: string,
//     label: string,
// }) {

export default function OrderByAction(
  {
    fieldArrayName,
    label,
    // options = [defaultTag],
    options,
  } : NestedTagsArrayProps) {
  const { control, } = useFormContext()

  // const currentBreakpoint = useGetBreakpoint()
  // console.log("breakpoint", currentBreakpoint)
  // console.log(options)

  const { fields, remove, append } = useFieldArray({
    control,
    name: fieldArrayName,
  })

  return (
    <>
      <Stack direction="row">
        {/* ====== ADD TAG BUTTON ====== */}
        <InputLabel sx={{padding: 1, alignSelf: "center"}} key={addUid(fieldArrayName)}>{label}</InputLabel>
        <IconButton color="primary" onClick={() => append(defaultOrderby)} key="addMoreOrderBy">
          <AddIcon />
        </IconButton>
      </Stack>
      <Box key={addUid(fieldArrayName)} sx={{ flexDirection: "column", flexGrow: 1 }}>
        <Grid key="orderByActionGridContainer" container sx={{ flexGrow: 1}} spacing={2}>
          {/* Loop over tags */}
          {fields.map((item, index) => {
            // console.log("fieldname", `${fieldArrayName}[${index}].value`)
            return (
              <Fragment key={`fragment_${item.id}`}>
              <Grid item key={item.id} xs={7} zeroMinWidth>
                <Stack key={`stack_${item.id}`} direction="row">
                  {/* useFieldArray needs something with this id for remove to work: https://github.com/react-hook-form/react-hook-form/issues/1571#issuecomment-690882455 */}
                  <ControlledAutoComplete
                    key={`autocomplete_${item.id}`}
                    control={control}
                    // name={`${fieldArrayName}[${index}]`}
                    name={`${fieldArrayName}[${index}].value`}
                    // name={`${fieldArrayName}[${index}]`}
                    getOptionLabel={option => {
                      // const val =  option !== "" ? option : defaultOrderby[0].value
                      let label = ""
                      if (typeof option === "string"){
                          // console.log("option is string")
                          label = option
                      }
                      else if (!option){
                          label = defaultOrderby.value
                      } else {
                          label = option?.value
                      }
                      const val =  option ? option.value : defaultOrderby.value
                      // console.log("getOptionLabel orderbyAction", {option}, {options}, {val}, {label})
                      return label
                    }}
                    onChange={(e, value, reason) => {
                      // const val = e.target.value
                      // console.log("onchange raw value", value, {reason})
                      const val = value?.value ?? value
                      console.log("onchange raw value: ", value, "extracted value", val)
                        return val
                    }}
                    label="Order By"
                    options={options}
                    AutoCompleteProps={{
                      sx:{ width: '100%', },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => remove(index)} color="secondary"
                              sx={{
                                // alignSelf: "flex-end",
                                // justifySelf: "flex-end",
                                float: "right",
                                position: 'absolute',
                                // left: '75%',
                                top: '-8%',
                                left: {xs: "82%", sm: "91%", md: "92%", lg: "94%", xl: "96%"},
                                // top: '-8%',
                              }}
                            >
                              <Box
                                component="img"
                                sx={{
                                  borderRadius: 10,
                                }}
                                src={CloseWindowImage}
                              />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ControlledSwitch
                    key={`switch_${item.id}`}
                    control={control}
                    name={`${fieldArrayName}[${index}].ascending`}
                    label="Ascending"
                  />
                </Stack>
              </Grid>
            </Fragment>
          )
        })}
        </Grid>
      </Box>
  </>
  )
}
