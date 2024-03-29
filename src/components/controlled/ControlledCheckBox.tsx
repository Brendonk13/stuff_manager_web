import { Checkbox, type CheckboxProps, FormControlLabel, InputLabel } from "@mui/material"
// import React from "react"
import { type ReactElement } from 'react';
import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form"

interface ControlledCheckboxProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label: string | ReactElement
  CheckboxProps?: CheckboxProps
}

const ControlledCheckbox = <FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  // defaultValue,
  CheckboxProps,
  ...props
}: ControlledCheckboxProps<FieldValueProps>) => {
    console.log({props})
return (
  <Controller
    control={control}
    name={name}
    render={({
      // fieldState: { error },
      field: { onChange, onBlur, value, ref },
    }) => (
      <FormControlLabel
        inputRef={ref}
        onBlur={onBlur}
        onChange={onChange}
        checked={!!value}
        // color="#1677ff"
        // control={<Checkbox {...CheckboxProps} sx={{color:"primary"}} />}
        control={<Checkbox {...CheckboxProps} />}
        //label={label}
        // label={<InputLabel sx={{color: "#1677ff"}} id={name}>{label ? label : ""}</InputLabel>}
        label={<InputLabel id={name}>{label ? label : ""}</InputLabel>}
        sx={{ cursor: "pointer" }}
        {...props}
      />
    )}
  />
)}
export default ControlledCheckbox

