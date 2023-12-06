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
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { type Option } from "@/types/Common"


//const filter = createFilterOptions();

// interface FilmOptionType {
//   inputValue?: string;
//   title: string;
//   year?: number;
// }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films: readonly FilmOptionType[] = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },

// type Options = Option[] | object[]

export interface ControlledAutocompleteProps<
  FieldValueProps extends FieldValues
> extends UseControllerProps<FieldValueProps> {
  label: string
  options: Option[],  // todo: change?
  multiple?: boolean
  TextFieldProps?: TextFieldProps
  AutoCompleteProps?: any // AutocompleteProps
  // createFilterOptions: () => typeof createFilterOptions,
  placeholder?: string
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
  getOptionLabel = (option) => option?.label ?? option,
  placeholder = '',
  // textFieldValue,
  // setTextFieldValue,
}: ControlledAutocompleteProps<FieldValueProps>) {

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
          onChange={(_e, values) => {
            // do things like transform input from filterOptions producing a new option such as when creating new projects
            onChange(_e, values)
            return field.onChange( values)
          }}
          filterOptions={filterOptions}
          selectOnFocus
          // clearOnBlur
          handleHomeEndKeys
          freeSolo
          options={options}
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
