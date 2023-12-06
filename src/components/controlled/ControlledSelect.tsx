import {
  FormControl,
  type FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from '@mui/material'
import React from 'react'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface Option {
  label: string
  value: string | number
}


// import { Option } from './types'

export interface ControlledSelectProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label?: string
  options: Option[]
  FormControlProps?: FormControlProps
  SelectProps?: SelectProps
}

export default function ControlledSelect<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  options,
  FormControlProps = {},
  SelectProps,
  ...props
}: ControlledSelectProps<FieldValueProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        fieldState: { error },
        field: { onChange: onChange, ref, value },
      }) => (
        <FormControl {...FormControlProps} {...props} error={Boolean(error)}>
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            labelId={label}
            id={name}
            label={label}

            inputRef={ref}
            value={value}
            {...props}
            {...SelectProps}
            onChange={(e) => {
              onChange(e.target.value)
              SelectProps?.onChange?.(e, null)
            }}
          >
            {options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              )
            })}
          </Select>
          {error?.message && (
            <FormHelperText color="error">{error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
