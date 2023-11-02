import { type FieldValues, type UseControllerProps } from 'react-hook-form'

//export interface ActionableFormProps<FieldValueProps extends FieldValues>
export interface ActionableFormProps extends UseControllerProps<FieldValues> {
  // TextFieldProps?: Omit<TextFieldProps, 'required' | 'placeholder' | 'label'>
}


export default function ActionableForm({
  control,
} : ActionableFormProps){


}
