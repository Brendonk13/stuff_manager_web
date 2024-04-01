import { type Dayjs } from "dayjs"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { DateField } from '@mui/x-date-pickers/DateField'
import dayjs from 'dayjs'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface ControlledDatePickerProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label: string
}

function transformDate(date: Date | Dayjs | null){
  // const formattedDate = date ? new Date(dayjs(date).toISOString()) : null
  const formattedDate = date ? dayjs(date) : null
  // console.log({formattedDate})
  return formattedDate
}

export default function ControlledDatePicker<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  ...props
}: ControlledDatePickerProps<FieldValueProps>) {
  return (
    <Controller
      name={name}
      control={control}
      // render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
      render={({ field: { onChange, value, ref }}) => {
        return (
        <DatePicker
          aria-labelledby={name}
          label={label}
          value={transformDate(value)}
          onChange={newDate => {
            try {
                console.log({newDate})
              onChange(transformDate(newDate))
            } catch (error) {
              console.error(error)
            }
          }}
          // disabled
          inputRef={ref}
          {...props}
        />
      )}}
    />
  )
}
