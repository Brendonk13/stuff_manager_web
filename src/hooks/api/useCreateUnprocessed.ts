import { useMutation } from '@tanstack/react-query'

import { createUnprocessed } from '@/api/UnprocessedService'
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

// TODO: add query keys caching
const useCreateUnprocessed = () => {
  const { openSnackbar } = useSnackbarContext()
  return useMutation({
    mutationFn: createUnprocessed,
    onSuccess: () => {
      openSnackbar({
        message: 'Unprocessed Item created successfully.',
        type: 'success',
      })
    },
    onError: () => {
      openSnackbar({
        message: 'Error: Unable to create Unprocessed Item.',
        type: 'error',
      })
    },
  })
}

export default useCreateUnprocessed

