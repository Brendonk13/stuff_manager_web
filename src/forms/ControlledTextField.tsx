import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

import { Box, InputLabel, type SxProps, TextField, Tooltip } from "@mui/material"

import { type TextFieldProps } from '@mui/material/TextField'
import { isEmpty } from 'lodash'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { type ChangeEvent } from "react"

export interface ControlledTextFieldProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label?: string
  TextFieldProps?: TextFieldProps
  tooltip?: string
  sx?: SxProps
  fullWidth?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function ControlledTextField<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  TextFieldProps,
  tooltip,
  sx,
  onChange = () => {},
  ...props
}: ControlledTextFieldProps<FieldValueProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        fieldState: { error },
        field: { onChange: hookOnChange, onBlur, value, ref },
      }) => (
        <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <InputLabel id={name}>{label ? label : ""}</InputLabel>
            {tooltip && (
              <Tooltip title={tooltip}>
                <InfoOutlinedIcon
                  sx={{
                    color: "#B7B7B7",
                    height: 20,
                    width: 20,
                  }}
                />
              </Tooltip>
            )}
          </Box>
          <TextField
            error={!isEmpty(error)}
            id={name}
            onChange={(e) => {
              onChange(e)
              hookOnChange(e)
            }}
            onBlur={onBlur}
            ref={ref}
            value={value}
            helperText={error?.message}
            {...TextFieldProps}
            {...props}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      )}
    />
  )
}

// export default ControlledTextField


// export interface ControlledTextFieldProps<FieldValueProps extends FieldValues>
//   extends UseControllerProps<FieldValueProps> {
//   label?: string | ReactElement<any, string | React.JSXElementConstructor<any>>
//   required?: boolean
//   autoFocus?: boolean
//   placeholder?: string
//   disabled?: boolean
//   TextFieldProps?: Omit<TextFieldProps, 'required' | 'placeholder' | 'label'>
//   rows?: number
//   fullWidth?: boolean
// }
// 
// export default function ControlledTextField<FieldValueProps extends FieldValues>({
//   control,
//   name,
//   label,
//   disabled = false,
//   required = false,
//   autoFocus = false,
//   placeholder = '',
//   TextFieldProps = {},
//   rows = 1,
//   fullWidth = false,
// }: ControlledTextFieldProps<FieldValueProps>) {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({
//         fieldState: { error },
//         field, // { onChange, onBlur, value, ref },
//       }) => (
//         <TextField
//           fullWidth={fullWidth}
//           error={!isEmpty(error)}
//           id={name}
//           required={required}
//           autoFocus={autoFocus}
//           placeholder={placeholder}
//           label={label}
//           disabled={disabled}
//           helperText={error?.message ?? ''}
//           multiline={rows > 1}
//           rows={rows}
//           {...field} // { onChange, onBlur, value, ref }
//           sx={{
//             '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
//               padding: '6px 10px 6px 6px',
//               backgroundColor: '#F9FAFB',
//             },
//             '& .MuiOutlinedInput-root': {
//               height: 'unset',
//             },
//           }}
//           {...TextFieldProps}
//           FormHelperTextProps={{
//             ...TextFieldProps.FormHelperTextProps,
//             sx: {
//               mx: 0,
//               ...TextFieldProps.FormHelperTextProps?.sx,
//             },
//           }}
//         />
//       )}
//     />
//   )
// }
// 
// // export { ControlledTextField }
// 
