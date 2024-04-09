// import { CloseRounded } from '@mui/icons-material'
import {
  Autocomplete,
  // IconButton,
  // InputAdornment,
  // Box,
  // createFilterOptions,
  TextField,
  type TextFieldProps,
  type InputProps,
  // type AutocompleteProps,
  // Typography,
} from '@mui/material'
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { type Option } from "@/types/Common"

// import CloseWindowImage from "@/assets/icons8-close-window-24.png"


export interface ControlledAutocompleteProps<
  FieldValueProps extends FieldValues
> extends UseControllerProps<FieldValueProps> {
  label: string
  options: Option[],  // todo: change?
  multiple?: boolean
  TextFieldProps?: TextFieldProps
  InputProps?: InputProps
  //AutoCompleteProps?: any // AutocompleteProps
  // AutoCompleteProps?: AutocompletePropsType // AutocompleteProps
  AutoCompleteProps?: any // AutocompleteProps
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

// function getLabel(value, label): string{
//   console.log({value}, label)
//   return value ? label : ""
//   // return (value && value.length) ? label : ""
//   // return label
// }

export default function ControlledAutocomplete<FieldValueProps extends FieldValues>({
  control,
  name,
  label = "",
  options,
  onChange = (e, newValue) => { },
  // createFilterOptions,
  // newChoicePrefix,
  filterOptions,
  multiple = false,
  TextFieldProps = {},
  AutoCompleteProps = {},
  InputProps = {},
  getOptionKey,
  getOptionLabel = (option) => option?.label ?? option,
  placeholder = '',
  // textFieldValue,
  // setTextFieldValue,
  ...props
}: ControlledAutocompleteProps<FieldValueProps>) {
  // console.log({InputProps})
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          id="controlled-autocomplete"
          aria-labelledby={name}
          {...field}
          {...AutoCompleteProps}
          {...props}
          multiple={multiple}
          onChange={(_e, values) => {
            // do things like transform input from filterOptions producing a new option such as when creating new projects
            field.onChange(values)
            return onChange(_e, values)
            // return field.onChange(values)
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
          renderInput={params => {
            // console.log({old: params.InputProps.endAdornment}, {old: )
            params.InputProps.endAdornment = InputProps?.endAdornment
            return (
              <TextField
                {...params}
                placeholder={placeholder}
                {...TextFieldProps}
                InputLabelProps={{ shrink: true }}
                label={field.value ? label : ""}
                sx={{
                  // make it stand out
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    height: 'unset',
                    backgroundColor: '#F9FAFB',
                  },
                }}
              />
            )}
          }
        />
      )}
    />
  )
}
