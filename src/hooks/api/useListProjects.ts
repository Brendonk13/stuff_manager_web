import { useQuery } from '@tanstack/react-query'
import { listProjects, projectQueryKeys } from "@/api/ProjectsService"

const useListProjects = () => {
  return useQuery({
    queryKey: [projectQueryKeys.LIST],
    queryFn: async () => await listProjects(),
    select: (res) => res.data,
  })
}

export default useListProjects
