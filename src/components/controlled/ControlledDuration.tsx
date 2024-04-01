import Duration from "@/components/common/Duration"
import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form"

interface ControlledDurationProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  // clearButton?: boolean
}


export default function ControlledDuration<FieldValueProps extends FieldValues>({
// export default function ControlledDuration({
  control,
  name,
} : ControlledDurationProps<FieldValueProps>) {
    return (
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, value },
        }) => (
          <Duration
            value={value}
            onChange={newValue => {
              console.log({newValue})
              onChange(newValue)
            }
            }
          />
        )}
      />
    )
}
