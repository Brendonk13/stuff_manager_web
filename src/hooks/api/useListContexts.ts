import { useQuery } from '@tanstack/react-query'
import { listContexts } from "@/api/ContextsService"

const useListContexts = () => {
  return useQuery({
    queryKey: ["ListContexts"],
    queryFn: async () => await listContexts(),
  })
}

export default useListContexts
