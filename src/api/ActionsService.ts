// import { type CreateUnprocessedRequestBody, type CreateUnprocessedResponse, type GetUnprocessedResponse } from "@/types/Common"
// TODO: CHANGE THIS FROM CREATEITEM to action
import { type CreateItemResponse, type CreateItem } from "@/types/Action"

import { CreateApiService } from './Service'

export const ActionsService = CreateApiService({
  baseURL: '/api/actions',
})

export const createActions = (body: CreateItem) =>
    ActionsService.post<CreateItemResponse>("", body).then(res => res.data)
