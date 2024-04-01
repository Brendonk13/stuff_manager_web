import { useQuery } from '@tanstack/react-query'
import { getActionCompletion, actionCompletionQueryKeys } from "@/api/ActionsService"

export default function useGetActionCompletion(actionId: number){
  return useQuery({
    queryKey: [actionCompletionQueryKeys.GET, actionId],
    queryFn: async () => await getActionCompletion(actionId),
  })
}
