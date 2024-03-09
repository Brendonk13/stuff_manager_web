import { useQuery } from '@tanstack/react-query'
import { listProjects } from "@/api/ProjectsService"

const useListProjects = () => {
  return useQuery({
    queryKey: ["ListProjects"],
    queryFn: async () => await listProjects(),
    select: (res) => res.data,
  })
}

export default useListProjects
