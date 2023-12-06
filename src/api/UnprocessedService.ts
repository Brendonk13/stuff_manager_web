import { type CreateUnprocessedRequestBody, type CreateUnprocessedResponse, type GetUnprocessedResponse } from "@/types/Unprocessed"


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


// export const postQueryKeys = createQueryKeys('posts', {
//   all: null,
//   my: {
//     queryKey: ['my-posts'],
//     queryFn: getMyPosts,
//   },
//   detail: (postId?: number) => ({
//     queryKey: ['detail', postId],
//     queryFn: () => getPostDetailsById(postId || 0),
//   }),
//   publicPostDetails: (postId?: string) => ({
//     queryKey: ['public-post-details', postId],
//     queryFn: () => getPublicPostDetailsById(postId || ''),
//   }),
//   recentHashtags: {
//     queryKey: ['recent-hashtags'],
//     queryFn: listRecentHashtags,
//   },
//   myHashtagCollections: {
//     queryKey: ['collection'],
//     queryFn: getMyHashtagCollections,
//   },
//   date: (dateRange, data: ListPostsByDateRequestQuery) => ({
//     queryKey: ['date', dateRange, data],
//     queryFn: () => listPostsByDate(data),
//   }),
// })
