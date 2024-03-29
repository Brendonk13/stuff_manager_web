import { TimeField } from '@mui/x-date-pickers/TimeField'
import dayjs from 'dayjs'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface ControlledTimePickerProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label: string
}

export default function ControlledTimeField<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  ...props
}: ControlledTimePickerProps<FieldValueProps>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }}) => (
        <TimeField
          aria-labelledby={name}
          label={label}
          value={value ? dayjs(value) : value}
          onChange={(e) => {
            try {
              onChange(e)
            } catch (error) {
              console.error(error)
            }
          }}
          inputRef={ref}
          {...props}
        />
      )}
    />
  )
}
