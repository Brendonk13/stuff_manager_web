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
}: ControlledCheckboxProps<FieldValueProps>) => (
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
        control={<Checkbox {...CheckboxProps} />}
        label={<InputLabel id={name}>{label ? label : ""}</InputLabel>}
        sx={{ cursor: "pointer" }}
        {...props}
      />
    )}
  />
)
export default ControlledCheckbox

