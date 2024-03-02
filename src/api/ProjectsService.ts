import { type EditProjectBody, type ListProjectsResponse, type GetProjectResponse } from "@/types/Project"

import { CreateApiService } from './Service'

export const ProjectsService = CreateApiService({
  baseURL: '/api/projects',
})

export const listProjects = () =>
    ProjectsService.get<ListProjectsResponse>(``).then(res => res.data)

export const getProject = (projectId: number) =>
    ProjectsService.get<GetProjectResponse>(`/${projectId}`).then(res => res.data)

export const editProject = (data: EditProjectBody) => {
    console.log({data})
  // todo: clear query keys for getting project
    return ProjectsService.put<GetProjectResponse>(`/${data.id}`, data).then(res => res.data)
    // return ProjectsService.put<GetProjectResponse>(``).then(res => res.data)
}
