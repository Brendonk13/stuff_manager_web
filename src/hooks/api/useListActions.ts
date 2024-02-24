import { useQuery } from '@tanstack/react-query'
import { listActions } from "@/api/ActionsService"
import { type ListActionQueryParams} from "@/types/Action"
import convertTags from "@/utils/random/convertTagsQueryParams"


export default function useListActions(queryParams?: ListActionQueryParams){
  if (queryParams?.tags){
    queryParams.tags = convertTags(queryParams.tags)
  }
  // console.log("outside usequery", {queryParams})

  return useQuery({
    queryKey: ["ListActions", queryParams],
    queryFn: async () => {
      console.log("useListActions", {queryParams})
      const data = await listActions(queryParams)
      console.log("========= HOOK", {data})
      return data
    },
    // ...postQueryKeys.detail(unprocessedId),
    // select: (res) => res.data,
  })
}
