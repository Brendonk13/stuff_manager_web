import { useQuery } from '@tanstack/react-query'
import { getProject } from "@/api/ProjectsService"

export default function useGetProject(projectId: number){
  return useQuery({
    queryKey: ["getProject", projectId],
    queryFn: async () => await getProject(projectId),
    select: (res) => res.data,
  })
}
