import { useQuery } from '@tanstack/react-query'
import { listActions } from "@/api/ActionsService"
import { type ListActionQueryParams} from "@/types/Action"


export default function useListActions(queryParams?: ListActionQueryParams){
  console.log("useListActions", {queryParams})
  return useQuery({
    queryKey: ["ListActions", queryParams],
    queryFn: async () => await listActions(queryParams),
    // ...postQueryKeys.detail(unprocessedId),
    // select: (res) => res.data,
  })
}
