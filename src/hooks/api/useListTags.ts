import { useQuery } from '@tanstack/react-query'
import { listTags, tagQueryKeys } from "@/api/TagsService"

const useListTags = () => {
  return useQuery({
    queryKey: [tagQueryKeys.LIST],
    queryFn: async () => await listTags(),
  })
}

export default useListTags
