import z from "zod"


// export const ProjectWithIdSchema = {
export const ProjectSchema = z.object({
  name: z.string().min(1, "Project Name is required"),
  notes: z.string(),
  // NOTE: making this non optional might break some types
  id: z.number(), //optional so we can use the same type everywhere ..
})

// export const ProjectSchema = z.object({
//   name: ProjectWithIdSchema.name,
//   notes: ProjectWithIdSchema.notes,
//   id: ProjectWithIdSchema.id,
// })

// ========================= create unproccessed =========================
export const CreateProjectRequestSchema = {
  body: ProjectSchema,
}

export const CreateProjectResponseSchema = z.object({
  message: z.string(),
  // data: z.object(ProjectWithIdSchema),
  data: ProjectSchema,
})

// ========================= get unproccessed ============================
// todo: make this be with ID's -- done
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
