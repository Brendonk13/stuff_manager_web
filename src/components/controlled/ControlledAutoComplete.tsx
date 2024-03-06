// import { CloseRounded } from '@mui/icons-material'
import {
  Autocomplete,
  createFilterOptions,
  TextField,
  type TextFieldProps,
  // type AutocompleteProps,
  // Typography,
} from '@mui/material'
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { Controller, type FieldValues, type UseControllerProps, type AutocompleteProps as AutocompletePropsType } from 'react-hook-form'
import { type Option } from "@/types/Common"



export interface ControlledAutocompleteProps<
  FieldValueProps extends FieldValues
> extends UseControllerProps<FieldValueProps> {
  label: string
  options: Option[],  // todo: change?
  multiple?: boolean
  TextFieldProps?: TextFieldProps
  //AutoCompleteProps?: any // AutocompleteProps
  AutoCompleteProps?: AutocompletePropsType // AutocompleteProps
  // createFilterOptions: () => typeof createFilterOptions,
  placeholder?: string
  getOptionKey?: (option: string | object) => string | number,
  // getOptionKey?: (option: string | object) => string | number,
  getOptionLabel?: (option: string | object) => string,
  // newChoicePrefix?: string,
  filterOptions: (options: Option[], newValue: Option) => Option[]

  onChange?: (e?: SyntheticEvent, newValue: Option) => void
  textFieldValue?: string
  setTextFieldValue?: Dispatch<SetStateAction<string>>
}


export default function ControlledAutocomplete<FieldValueProps extends FieldValues>({
  control,
  name,
  // label,
  options,
  onChange = (e, newValue) => { },
  // createFilterOptions,
  // newChoicePrefix,
  filterOptions,
  multiple = false,
  TextFieldProps = {},
  AutoCompleteProps = {},
  getOptionKey,
  getOptionLabel = (option) => option?.label ?? option,
  placeholder = '',
  // textFieldValue,
  // setTextFieldValue,
}: ControlledAutocompleteProps<FieldValueProps>) {

  const getValue = (value: any) => {
    if (value == null && AutoCompleteProps?.value != null){
      return AutoCompleteProps.value
    }
    return value
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          id="controlled-autocomplete"
          {...field}
          {...AutoCompleteProps}
          multiple={multiple}
          // value={getValue(AutoCompleteProps?.value)}
          onChange={(_e, values) => {
            // how about I do the following: if values == null, then set AutocompleteProps.value = null
            // do things like transform input from filterOptions producing a new option such as when creating new projects
            if (values == null){
              AutoCompleteProps.value = null
            }
            const value = getValue(values)
            console.log(_e, {values}, "new", {value})
            onChange(_e, value)
            return field.onChange(value)
          }}
          filterOptions={filterOptions}
          selectOnFocus
          // clearOnBlur
          handleHomeEndKeys
          freeSolo
          // getOptionKey={getOptionKey} // this not recognized for some reason as in material ui doesnt know it event hot its here: https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-getOptionKey
          options={options}
          getOptionKey={getOptionKey}
          filterSelectedOptions
          getOptionLabel={getOptionLabel}
          //onChange={(_e, values) => field.onChange( values)}
          renderInput={params => (
              <TextField
                {...params}
                placeholder={placeholder}
                {...TextFieldProps}
                sx={{
                  // make it stand out
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    height: 'unset',
                    backgroundColor: '#F9FAFB',
                  },
                }}
              />
            )
          }
        />
      )}
    />
  )
}
