import { useQuery } from '@tanstack/react-query'
import { listContexts, contextQueryKeys } from "@/api/ContextsService"

const useListContexts = () => {
  return useQuery({
    queryKey: [contextQueryKeys.LIST],
    queryFn: async () => await listContexts(),
  })
}

export default useListContexts
