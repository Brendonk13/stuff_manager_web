import { useQuery } from '@tanstack/react-query'
import { getAction, actionQueryKeys } from "@/api/ActionsService"

export default function useGetAction(actionId: number){
  return useQuery({
    queryKey: [actionQueryKeys.GET, actionId],
    queryFn: async () => await getAction(actionId),
  })
}
