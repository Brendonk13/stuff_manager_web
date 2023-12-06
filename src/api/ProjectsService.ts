// import { type CreateUnprocessedRequestBody, type CreateUnprocessedResponse, type GetUnprocessedResponse } from "@/types/Common"
import { type ListProjectsResponse } from "@/types/Project"

import { CreateApiService } from './Service'

export const ProjectsService = CreateApiService({
  baseURL: '/api/projects',
})

export const listProjects = () =>
    ProjectsService.get<ListProjectsResponse>(``).then(res => res.data)
