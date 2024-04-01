import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editActionCompletion, actionQueryKeys, actionCompletionQueryKeys } from '@/api/ActionsService'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

export default function useEditActionCompletion(){
  const { openSnackbar } = useSnackbarContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editActionCompletion,
    onSuccess: async () => {
      // invalidate all getAction calls
      await queryClient.invalidateQueries({ queryKey: [actionQueryKeys.GET] })
      await queryClient.invalidateQueries({ queryKey: [actionCompletionQueryKeys.GET] })

      openSnackbar({
        message: 'Action Completion saved',
        type: 'success',
      })
    },

    onError: () => {
      openSnackbar({
        message: 'Error: Unable to save changes',
        type: 'error',
      })
    },
  })
}

