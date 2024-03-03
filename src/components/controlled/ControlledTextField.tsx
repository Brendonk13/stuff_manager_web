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

  const getValue = (value: string | undefined) => {
    // on pageload, the value passed in from the controller is null
    // if TextFieldProps.value was set, then we set it to this value obtained from URL query string
    // console.log("getValue ==", value, typeof value, "==", TextFieldProps?.value, typeof TextFieldProps?.value)
    if (value == "" && TextFieldProps?.value)
      return TextFieldProps.value
    return value
  }


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
            helperText={error?.message}
            // width={`${getValue(value).length}ch`}
            // inputProps={{size: Math.max(getValue(value).length, 6)}}
            {...props}
            {...TextFieldProps}
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            value={getValue(value)}
          />
        </Box>
      )}
    />
  )
}
