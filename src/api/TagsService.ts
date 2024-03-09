import { type ListTagResponse } from "@/types/Tag"

import { CreateApiService } from './Service'

export const TagsService = CreateApiService({
  baseURL: '/api/tags',
})

export const listTags = () =>
  TagsService.get<ListTagResponse>(``).then(res => res.data)
