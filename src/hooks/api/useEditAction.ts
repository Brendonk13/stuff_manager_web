import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editAction } from '@/api/ActionsService'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

export default function useEditAction(){
  const { openSnackbar } = useSnackbarContext()

  return useMutation({
    mutationFn: editAction,
    onSuccess: () => {
      openSnackbar({
        message: 'Action saved',
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

