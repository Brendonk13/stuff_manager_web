import { useQuery } from '@tanstack/react-query'
import { getProject, projectQueryKeys } from "@/api/ProjectsService"

export default function useGetProject(projectId: number){
  return useQuery({
    queryKey: [projectQueryKeys.GET, projectId],
    queryFn: async () => await getProject(projectId),
  })
}
