import { useQuery } from '@tanstack/react-query'
import { getAction } from "@/api/ActionsService"

export default function useGetAction(actionId: number){
  return useQuery({
    queryKey: ["getAction", actionId],
    queryFn: async () => await getAction(actionId),
  })
}
