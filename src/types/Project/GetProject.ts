import z from "zod"
import { projectSchemaObject } from "./Project"

// may have errors
// export const GetProjectResponseSchema = z.object({
//   message: z.string(),
//   data: ProjectSchema,
// })

export const GetProjectResponseSchema = z.object(projectSchemaObject)
export type GetProjectResponse = z.infer<typeof GetProjectResponseSchema>
