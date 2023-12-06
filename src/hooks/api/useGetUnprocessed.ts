import { useQuery } from '@tanstack/react-query'
import { getUnprocessed } from "@/api/UnprocessedService"

// import { postQueryKeys } from '@/api/PostService'
// import { type GetUnprocessedResponse } from "@/types/Common"

// interface GetUnprocessedResponseFull {
//   message
// }

const useGetUnprocessed = (unprocessedId: number) => {
  return useQuery({
    queryKey: ["GetUnprocessed", unprocessedId],
    queryFn: async () => await getUnprocessed(unprocessedId),
    // ...postQueryKeys.detail(unprocessedId),
    enabled: Boolean(unprocessedId),
    select: (res) => res.data,
  })
}

export default useGetUnprocessed
