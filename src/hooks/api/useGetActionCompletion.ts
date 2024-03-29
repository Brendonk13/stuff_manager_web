import { useQuery } from '@tanstack/react-query'
import { getActionCompletion, actionQueryKeys } from "@/api/ActionsService"

export default function useGetActionCompletion(actionId: number){
  return useQuery({
    queryKey: [actionQueryKeys.GET, actionId],
    queryFn: async () => await getActionCompletion(actionId),
  })
}
