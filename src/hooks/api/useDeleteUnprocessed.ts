import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { deleteUnprocessed } from "@/api/UnprocessedService"

export default function useDeleteUnprocessed() {
  const { openSnackbar } = useSnackbarContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUnprocessed,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ListUnprocessed"],
      })
      openSnackbar({
        message: 'Unprocessed item was deleted successfully',
        type: 'success',
      })
    },

    onError: () => {
      openSnackbar({
        message: 'Error: Unable to delete Unprocessed item',
        type: 'error',
      })
    },
  })
}
