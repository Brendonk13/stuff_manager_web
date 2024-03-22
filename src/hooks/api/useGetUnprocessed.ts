import { useQuery } from '@tanstack/react-query'
import { getUnprocessed, unprocessedQueryKeys } from "@/api/UnprocessedService"

const useGetUnprocessed = (unprocessedId: number) => {
  return useQuery({
    queryKey: [unprocessedQueryKeys.GET, unprocessedId],
    queryFn: async () => await getUnprocessed(unprocessedId),
    enabled: Boolean(unprocessedId),
    select: (res) => res.data,
  })
}

export default useGetUnprocessed
