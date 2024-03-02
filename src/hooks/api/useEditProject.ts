import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editProject } from '@/api/ProjectsService'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

export default function useEditProject(){
  const queryClient = useQueryClient()
  const { openSnackbar } = useSnackbarContext()

  return useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      openSnackbar({
        message: 'Project saved',
        type: 'success',
      })
      // queryClient.invalidateQueries({ queryKey: contactQueryKeys.my._def })

    },
    onError: () => {
      openSnackbar({
        message: 'Error: Unable to save changes',
        type: 'error',
      })
    },
  })
}

