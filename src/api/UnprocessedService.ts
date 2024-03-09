import { type CreateUnprocessedRequestBody, type CreateUnprocessedResponse, type GetUnprocessedResponse, type ListUnprocessedResponse, type DeleteUnprocessedResponse } from "@/types/Unprocessed"
// todo: change capitalization of Unprocessed file


import { CreateApiService } from './Service'

const UnprocessedService = CreateApiService({
  baseURL: '/api/unprocessed',
})

// todo: make the api only return the id
// todo: remove the .then
export const createUnprocessed = (body: CreateUnprocessedRequestBody) =>
  UnprocessedService.post<CreateUnprocessedResponse>('', body).then(res => res.data)

export const getUnprocessed = (unprocessedId: number) =>
  UnprocessedService.get<GetUnprocessedResponse>(`/${unprocessedId}`).then(res => res.data)

export const listUnprocessed = () =>
  UnprocessedService.get<ListUnprocessedResponse>(``).then(res => res.data)

export const deleteUnprocessed = (unprocessedId: number) =>
  UnprocessedService.delete<DeleteUnprocessedResponse>(`/${unprocessedId}`).then(res => res.data)
