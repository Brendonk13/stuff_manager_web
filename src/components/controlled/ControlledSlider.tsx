// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Button, Stack, Box, InputLabel, Slider, type SliderProps } from "@mui/material"
// import React from "react"
import { type ReactElement } from 'react';
import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form"

// interface SliderMark {
//   label: string | number
//   value: string | number
// }

interface ControlledSliderProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label: string | ReactElement
  SliderProps?: SliderProps
  // clearButton?: boolean
}

export default function ControlledSlider<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  defaultValue,
  // clearButton,
  SliderProps,
  ...props
}: ControlledSliderProps<FieldValueProps>){
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
      }) => (
        <>
          {/* <Stack direction="row"> */}
            <InputLabel id={name}>{label}</InputLabel>
            {/* {clearButton && <Button onClick={() => value = null}>Clear</Button>} */}
          {/* </Stack> */}
          <Box padding={1} >
            <Slider
              // valueLabelFormat={((value, idx) => `value:${value}`)}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              {...SliderProps}
              {...props}
            />
          </Box>
      </>
      )}
    />
  )
}
