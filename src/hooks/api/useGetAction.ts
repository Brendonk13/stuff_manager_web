import { useQuery } from '@tanstack/react-query'
import { getAction, actionQueryKeys } from "@/api/ActionsService"
import { defaultAction } from "@/types/Action"

export default function useGetAction(actionId: number){
  // if (actionId === 0){
  //   return defaultAction
  // }
  return useQuery({
    queryKey: [actionQueryKeys.GET, actionId],
    queryFn: async () => await getAction(actionId),
    enabled: Boolean(actionId),
    // todo what happens when this is not ran ??
  })
}
