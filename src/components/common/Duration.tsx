import { useState } from "react"
import { InputLabel, Stack, TextField } from '@mui/material'
import { type SyntheticEvent } from 'react'

interface DurationProps {
  value: number[]
  onChange?: (e: SyntheticEvent) => void
  // onChange?: (newValue: string) => void
}

export default function Duration({value: valueProp, onChange, ...props}: DurationProps){
  // value comes from Controller
  // const [days, hours, minutes] = valueProp

  const [value, setValue] = useState(valueProp)

  // console.log({value}, days, hours, minutes)

  return (
    <>
    <InputLabel id="duration">Duration</InputLabel>
    <Stack direction="row">
      <TextField
        label="Days"
        type="number"
        value={value[0]}
        onChange={e => {
          const day = Number(e.target.value)
          const newValue = [day, value[1], value[2]]

          setValue(newValue)
          onChange(newValue)
        }}
      />
      <TextField
        label="Hours"
        type="number"
        value={value[1]}
        onChange={e => {
          const hour = Number(e.target.value)
          const newValue = [value[0], hour, value[2]]

          setValue(newValue)
          onChange(newValue)
        }}
      />
      <TextField
        label="Minutes"
        type="number"
        value={value[2]}
        onChange={e => {
          const minute = Number(e.target.value)
          const newValue = [value[0], value[1], minute]

          setValue(newValue)
          onChange(newValue)
        }}
      />
    </Stack>
  </>
  )

}
