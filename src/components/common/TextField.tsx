import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

import { Box, InputLabel, type SxProps, TextField, Tooltip } from "@mui/material"

export interface TextFieldTooltipProps {
  name: string
  label?: string
  tooltip?: string
  sx?: SxProps
}

const textFieldTooltipProps = {
  sx: {
    width: '60%',
    padding: 1,
  }
}

export default function TextFieldTooltip({
  name,
  label,
  tooltip,
  sx,
  ...props
}: TextFieldTooltipProps) {
  return (
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
        id={name}
        {...textFieldTooltipProps}
        {...props}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  )
}

