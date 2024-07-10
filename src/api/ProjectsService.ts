import { type EditProjectResponse, type EditProjectBody} from "@/types/Project/EditProject"
import { type CreateProjectRequestBody, type CreateProjectResponse } from "@/types/Project/CreateProject"
import { type ListProjectsResponse } from "@/types/Project/ListProject"
import { type GetProjectResponse } from "@/types/Project/GetProject"
// import { type EditProjectBody, type ListProjectsResponse, type GetProjectResponse, type EditProjectResponse, type CreateProjectRequestBody, type CreateProjectResponse } from "@/types/Project"

import { CreateApiService } from './Service'

export const ProjectsService = CreateApiService({
  baseURL: '/api/projects',
})

export const listProjects = () =>
    ProjectsService.get<ListProjectsResponse>(``).then(res => res.data)

export const getProject = (projectId: number) =>
    ProjectsService.get<GetProjectResponse>(`/${projectId}`).then(res => res.data)

export const editProject = (data: EditProjectBody) => {
    // console.log({data})
    return ProjectsService.put<EditProjectResponse>(`/${data.id}`, data).then(res => res.data)
}

export const createProject = (data: CreateProjectRequestBody) => {
    // console.log({data})
    return ProjectsService.post<CreateProjectResponse>(``, data).then(res => res.data)
}


export const projectQueryKeys = {
  LIST: "ListProjects",
  GET: "GetProject"
}
