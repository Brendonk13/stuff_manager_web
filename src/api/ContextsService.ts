import { type ListContextResponse } from "@/types/Action"

import { CreateApiService } from './Service'

export const ContextsService = CreateApiService({
  baseURL: '/api/contexts',
})

export const listContexts = () =>
  ContextsService.get<ListContextResponse>(``).then(res => res.data)


export const contextQueryKeys = {
  LIST: "ListContexts",
  GET: "GetContext"
}
