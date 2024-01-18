import { type ListProjectsResponse, type GetProjectResponse } from "@/types/Project"

import { CreateApiService } from './Service'

export const ProjectsService = CreateApiService({
  baseURL: '/api/projects',
})

export const listProjects = () =>
    ProjectsService.get<ListProjectsResponse>(``).then(res => res.data)

export const getProject = (projectId: number) =>
    ProjectsService.get<GetProjectResponse>(`/${projectId}`).then(res => res.data)
