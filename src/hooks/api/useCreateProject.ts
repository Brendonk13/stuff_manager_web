import { useMutation } from '@tanstack/react-query'

import { createProject } from '@/api/ProjectsService'
// import { useSnackbarContext } from '@/contexts/SnackbarContext'
import { useSnackbarContext } from '@/contexts/SnackbarContext'

// TODO: add query keys caching
export default function useCreateProject(){
  const { openSnackbar } = useSnackbarContext()

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
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
