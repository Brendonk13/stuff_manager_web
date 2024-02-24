import { type ListTagResponse } from "@/types/Action"

import { CreateApiService } from './Service'

export const TagsService = CreateApiService({
  baseURL: '/api/tags',
})

export const listTags = () =>
  TagsService.get<ListTagResponse>(``).then(res => res.data)
