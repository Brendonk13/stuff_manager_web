import { useQuery } from '@tanstack/react-query'
import { listTags } from "@/api/TagsService"

const useListTags = () => {
  return useQuery({
    queryKey: ["ListTags"],
    queryFn: async () => await listTags(),
  })
}

export default useListTags
