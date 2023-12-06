import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import {
  Box,
  FormControl,
  type FormControlProps,
  FormHelperText,
  type SelectProps,
  Slider,
  type SxProps,
  TextField,
  Tooltip,
} from "@mui/material"
import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form"

export interface ControlledSliderProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label?: string
  FormControlProps?: FormControlProps
  SelectProps?: SelectProps
  tooltip?: string
  sx?: SxProps
  fullWidth?: boolean
}

function ControlledSlider<FieldValueProps extends FieldValues>({
  control,
  name,
  FormControlProps = {},

  tooltip,
  sx,
  ...props
}: ControlledSliderProps<FieldValueProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        fieldState: { error },
        formState: { errors },
        field: { onChange: onChange, value },
      }) => (
        <FormControl {...FormControlProps} {...props} error={Boolean(error)}>
          <Box sx={sx}>
            {tooltip && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}
              >
                <Tooltip title={tooltip}>
                  <InfoOutlinedIcon
                    sx={{
                      color: "#B7B7B7",
                      height: 22,
                      width: 22,
                      mb: 3 / 2,
                      mt: -1 / 2,
                    }}
                  />
                </Tooltip>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Slider
                aria-label="input-slider"
                defaultValue={10}
                size="medium"
                value={value}
                onChange={onChange}
                // step={10}
                // marks={true}
                min={0}
                max={50}
                sx={{
                  mr: 2,
                  flex: 5,
                  mt: 1,
                  "& .MuiSlider-mark": {
                    color: "gray",
                    height: "12px",
                    width: "3px",
                    opacity: "30%",
                  },
                  "& .MuiSlider-mark:nth-of-type(8)": {
                    opacity: "0%",
                  },
                  "& .MuiSlider-mark:nth-of-type(3)": {
                    opacity: "0%",
                  },
                }}
              />
              <TextField
                value={value}
                size="small"
                onChange={onChange}
                inputProps={{
                  // step: 10,
                  min: 0,
                  max: 50,
                  "aria-labelledby": "input-slider",
                }}
                sx={{ flex: 1 / 2, ml: 5, justifyContent: "center" }}
              />
            </Box>
          </Box>

          {errors[name]?.message && (
            <FormHelperText color="error">
              {errors[name]?.message as string}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

export default ControlledSlider
