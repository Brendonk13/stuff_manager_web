import { useQuery } from '@tanstack/react-query'
import { listActions, actionQueryKeys } from "@/api/ActionsService"
import { type ListActionQueryParams} from "@/types/Action/ListAction"
// import convertTags from "@/utils/random/convertTagsQueryParams"


export default function useListActions(queryParams?: ListActionQueryParams){

  return useQuery({
    queryKey: [actionQueryKeys.LIST, queryParams],
    queryFn: async () => {
      // console.log("useListActions", {queryParams})
      const data = await listActions(queryParams)
      // console.log("========= HOOK", {data})
      return data
    },
  })
}
