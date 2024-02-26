// import { type CreateUnprocessedRequestBody, type CreateUnprocessedResponse, type GetUnprocessedResponse } from "@/types/Common"
// TODO: CHANGE THIS FROM CREATEITEM to action
import { type CreateItemResponse, type CreateItem, type ListActionResponse, type ListActionQueryParams} from "@/types/Action"

import { CreateApiService } from './Service'

export const ActionsService = CreateApiService({
  baseURL: '/api/actions',
})

export const createActions = (body: CreateItem) =>
    ActionsService.post<CreateItemResponse>("", body).then(res => res.data)

// how to add query parameters
export const listActions = async (queryParams?: ListActionQueryParams) => {
  const config = {params: queryParams}

  const data = await ActionsService.get<ListActionResponse>(``, config).then(res => res.data)
  // console.log("SERVICE", {data})
  return data
}
