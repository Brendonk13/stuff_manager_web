import z from "zod"
import { projectSchemaObject } from "./Project"

// // todo: removed message
// export const ListProjectsResponseSchema = z.object({
//   message: z.string(),
//   data: z.array(ProjectSchema),
// })

export const ListProjectsResponseSchema = z.array(z.object(projectSchemaObject))

export type ListProjectsResponse = z.infer<typeof ListProjectsResponseSchema>
