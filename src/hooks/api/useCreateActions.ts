import { useMutation } from '@tanstack/react-query'

import { createActions } from '@/api/ActionsService'
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

// TODO: add query keys caching
export default function useCreateActions(){
// const useCreateUnprocessed = () => {
  const { openSnackbar } = useSnackbarContext()
  return useMutation({
    mutationFn: createActions,
    onSuccess: () => {
      openSnackbar({
        message: 'Action(s) successfully processed',
        type: 'success',
      })
    },
    onError: () => {
      openSnackbar({
        message: 'Error: Unable to process Action(s)',
        type: 'error',
      })
    },
  })
}

// export default useCreateUnprocessed

