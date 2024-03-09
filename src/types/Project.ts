import z from "zod"


const projectSchemaObject = {
  name: z.string().min(1, "Project Name is required"),
  notes: z.string().optional(),
  id: z.number(),
}

export const ProjectSchema = z.object(projectSchemaObject)
export type Project = z.infer<typeof ProjectSchema>

// ========================= CREATE =========================
export const CreateProjectRequestSchema = {
  body: ProjectSchema,
}

export const CreateProjectResponseSchema = z.object({
  message: z.string(),
  data: ProjectSchema,
})

export type CreateProjectRequestBody = z.infer<typeof CreateProjectRequestSchema.body>
export type CreateProjectResponse = z.infer<typeof CreateProjectResponseSchema>


// ========================= GET ============================
export const GetProjectResponseSchema = z.object({
  message: z.string(),
  data: ProjectSchema,
})
export type GetProjectResponse = z.infer<typeof GetProjectResponseSchema>


// ========================= LIST ============================
export const ListProjectsResponseSchema = z.object({
  message: z.string(),
  data: z.array(ProjectSchema),
})
export type ListProjectsResponse = z.infer<typeof ListProjectsResponseSchema>


// ========================= Edit ============================
export const EditProjectSchema = z.object({
  name: projectSchemaObject.name.optional(),
  notes: projectSchemaObject.notes,
  id: projectSchemaObject.id,
})

export type EditProjectBody = z.infer<typeof EditProjectSchema>
export type EditProjectResponse = GetProjectResponse


export const defaultProject: Project = {
  name: "",
  notes: "",
  id: 0,
}

