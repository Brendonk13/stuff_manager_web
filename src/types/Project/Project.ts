import z from "zod"


export const projectSchemaObject = {
  name: z.string().min(1, "Project Name is required"),
  notes: z.string().optional(),
  id: z.number(),
}

export const UnrestrictedProjectSchema = z.object(
  {...projectSchemaObject, name: z.string()}
)

export const ProjectSchema = z.object(projectSchemaObject)
export type Project = z.infer<typeof ProjectSchema>


export const defaultProject: Project = {
  name: "",
  notes: "",
  id: 0,
}

