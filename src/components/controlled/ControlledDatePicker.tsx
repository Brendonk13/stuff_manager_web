import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField'
import dayjs from 'dayjs'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface ControlledDatePickerProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label: string
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
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <DatePicker
          aria-labelledby={name}
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(e) => {
            try {
              onChange(e)
            } catch (error) {
              console.error(error)
            }
          }}
          // disabled
          inputRef={ref}
          {...props}
        />
      )}
    />
  )
}
