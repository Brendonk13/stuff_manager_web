import z from "zod"


export const ProjectSchema = z.object({
  name: z.string().min(1, "Project Name is required"),
  notes: z.string(),
  id: z.number(),
})

// ========================= create unproccessed =========================
export const CreateProjectRequestSchema = {
  body: ProjectSchema,
}

export const CreateProjectResponseSchema = z.object({
  message: z.string(),
  data: ProjectSchema,
})

// ========================= get unproccessed ============================
export const GetProjectResponseSchema = z.object({
  message: z.string(),
  data: ProjectSchema,
})

export const ListProjectsResponseSchema = z.object({
  message: z.string(),
  data: z.array(ProjectSchema),
})

export type CreateProjectRequestBody = z.infer<typeof CreateProjectRequestSchema.body>
export type CreateProjectResponse = z.infer<typeof CreateProjectResponseSchema>

export type GetProjectResponse = z.infer<typeof GetProjectResponseSchema>
export type ListProjectsResponse = z.infer<typeof ListProjectsResponseSchema>
export type Project = z.infer<typeof ProjectSchema>
