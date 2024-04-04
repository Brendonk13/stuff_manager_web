// import { type CreateUnprocessedRequestBody, type CreateUnprocessedResponse, type GetUnprocessedResponse } from "@/types/Common"
// TODO: CHANGE THIS FROM CREATEITEM to action
import { type ListActionResponse, type ListActionQueryParams } from "@/types/Action/ListAction"
import { type GetActionResponse } from "@/types/Action/GetAction"
import { type EditActionResponse, type EditActionBody } from "@/types/Action/EditAction"
import { type EditActionCompletionBody, type EditActionCompletionResponse, type GetActionCompletionResponse } from "@/types/Action/ActionCompletion"
import { type CreateItemResponse, type CreateItem } from "@/types/CreateItem"

import { CreateApiService } from './Service'

export const ActionsService = CreateApiService({
  baseURL: '/api/actions',
})

export const createActions = (body: CreateItem) =>
    ActionsService.post<CreateItemResponse>("", body).then(res => res.data)

export const listActions = async (queryParams?: ListActionQueryParams) => {
  const config = {params: queryParams}

  const data = await ActionsService.get<ListActionResponse>(``, config).then(res => res.data)
  // console.log("SERVICE", {data})
  return data
}

export const getAction = (actionId: number) =>
    ActionsService.get<GetActionResponse>(`/${actionId}`).then(res => res.data)

export const editAction = (data: EditActionBody) =>
  ActionsService.put<EditActionResponse>(`/${data.id}`, data).then(res => res.data)

export const editActionCompletion = (data: EditActionCompletionBody) =>
  ActionsService.put<EditActionCompletionResponse>(`/${data.actionId}/completion`, data).then(res => res.data)

export const getActionCompletion = (actionId: number) =>
    ActionsService.get<GetActionCompletionResponse>(`/${actionId}/completion`).then(res => res.data)

export const actionQueryKeys = {
  LIST: "ListActions",
  GET: "GetAction"
}

export const actionCompletionQueryKeys = {
  // LIST: "ListActionCompletion",
  GET: "GetActionCompletion"
}
