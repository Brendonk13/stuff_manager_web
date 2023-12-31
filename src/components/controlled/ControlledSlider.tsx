// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Box, InputLabel, Slider, type SliderProps } from "@mui/material"
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
}

// todo: pass in marks, step, min, max as input

export default function ControlledSlider<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  defaultValue,
  SliderProps,
  ...props
}: ControlledSliderProps<FieldValueProps>){
  return (
    <Controller
      control={control}
      name={name}
      render={({
        // fieldState: { error },
        // field: { onChange, onBlur, value, ref },
        field: { onChange, value },
      }) => (
        <>
          <InputLabel id={name}>{label}</InputLabel>
          <Box padding={1} >
            <Slider
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
