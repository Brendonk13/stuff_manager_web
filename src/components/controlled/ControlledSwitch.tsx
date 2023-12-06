import { type SwitchProps, FormControlLabel, Switch } from "@mui/material"
// import React from "react"
// import { type ReactNode } from "react"
import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form"

interface ControlledSwitchProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label: string
  SwitchProps?: SwitchProps
}

const ControlledSwitch = <FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  // defaultValue,
  // SwitchProps,
  // ...props
}: ControlledSwitchProps<FieldValueProps>) => (
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
        control={<Switch />}
        disableTypography
        label={label}
        labelPlacement="start"
        sx={{ cursor: "pointer", fontSize: "12px", color: "#898989" }}
      />
    )}
  />
)
export default ControlledSwitch
