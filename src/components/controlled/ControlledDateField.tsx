import { DateField } from '@mui/x-date-pickers/DateField'
import dayjs from 'dayjs'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface ControlledDatePickerProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label: string
}

export default function ControlledDateField<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  ...props
}: ControlledDatePickerProps<FieldValueProps>) {
  return (
    <Controller
      name={name}
      control={control}
      // render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
      render={({ field: { onChange, value, ref } }) => (
        <DateField
          aria-labelledby={name}
          label={label}
          value={value && dayjs(value)}
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
