import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createActions, actionQueryKeys } from '@/api/ActionsService'
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

export default function useCreateActions(){
  const { openSnackbar } = useSnackbarContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createActions,

    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [actionQueryKeys.LIST]})
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

