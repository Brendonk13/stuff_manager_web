import { useQuery } from '@tanstack/react-query'
import { listUnprocessed, unprocessedQueryKeys } from "@/api/UnprocessedService"

export default function useListUnprocessed() {
  return useQuery({
    queryKey: [unprocessedQueryKeys.LIST],
    queryFn: async () => await listUnprocessed(),
    // select: (res) => res.data,
  })
}
