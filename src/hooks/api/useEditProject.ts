import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editProject } from '@/api/ProjectsService'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

export default function useEditProject(){
  const { openSnackbar } = useSnackbarContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editProject,
    onSuccess: async () => {
      // invalidate all getProject calls
      await queryClient.invalidateQueries({ queryKey: ["getProject"] })

      openSnackbar({
        message: 'Project saved',
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

