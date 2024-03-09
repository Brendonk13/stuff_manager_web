import { useQuery } from '@tanstack/react-query'
import { listUnprocessed } from "@/api/UnprocessedService"

export default function useListUnprocessed() {
  return useQuery({
    queryKey: ["ListUnprocessed"],
    queryFn: async () => await listUnprocessed(),
    select: (res) => res.data,
  })
}
