import { TextField } from '@mui/material'
import { type TextFieldProps } from '@mui/material/TextField'
import { isEmpty } from 'lodash'
import React, { type ReactElement } from 'react'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface ControlledTextFieldProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label?: string | ReactElement<any, string | React.JSXElementConstructor<any>>
  required?: boolean
  autoFocus?: boolean
  placeholder?: string
  disabled?: boolean
  TextFieldProps?: Omit<TextFieldProps, 'required' | 'placeholder' | 'label'>
  rows?: number
  fullWidth?: boolean
}

export default function ControlledTextField<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  required = false,
  autoFocus = false,
  placeholder = '',
  TextFieldProps = {},
  rows = 1,
  fullWidth = false,
}: ControlledTextFieldProps<FieldValueProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        fieldState: { error },
        field, // { onChange, onBlur, value, ref },
      }) => (
        <TextField
          fullWidth={fullWidth}
          error={!isEmpty(error)}
          id={name}
          required={required}
          autoFocus={autoFocus}
          placeholder={placeholder}
          label={label}
          disabled={disabled}
          helperText={error?.message ?? ''}
          multiline={rows > 1}
          rows={rows}
          {...field} // { onChange, onBlur, value, ref }
          sx={{
            '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
              padding: '6px 10px 6px 6px',
              backgroundColor: '#F9FAFB',
            },
            '& .MuiOutlinedInput-root': {
              height: 'unset',
            },
          }}
          {...TextFieldProps}
          FormHelperTextProps={{
            ...TextFieldProps.FormHelperTextProps,
            sx: {
              mx: 0,
              ...TextFieldProps.FormHelperTextProps?.sx,
            },
          }}
        />
      )}
    />
  )
}

// export { ControlledTextField }

