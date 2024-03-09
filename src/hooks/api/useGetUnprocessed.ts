import { useQuery } from '@tanstack/react-query'
import { getUnprocessed } from "@/api/UnprocessedService"

const useGetUnprocessed = (unprocessedId: number) => {
  return useQuery({
    queryKey: ["GetUnprocessed", unprocessedId],
    queryFn: async () => await getUnprocessed(unprocessedId),
    enabled: Boolean(unprocessedId),
    select: (res) => res.data,
  })
}

export default useGetUnprocessed
