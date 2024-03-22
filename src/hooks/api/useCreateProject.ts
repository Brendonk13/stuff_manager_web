import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createProject, projectQueryKeys } from '@/api/ProjectsService'
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

// TODO: add query keys caching
export default function useCreateProject(){
  const { openSnackbar } = useSnackbarContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,

    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [projectQueryKeys.LIST]})
      openSnackbar({
        message: 'Project successfully created',
        type: 'success',
      })
    },

    onError: () => {
      openSnackbar({
        message: 'Error: Unable to create Project',
        type: 'error',
      })
    },
  })
}
