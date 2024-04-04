import z from "zod"
import { projectSchemaObject } from "./Project"

export const CreateProjectResponseSchema = z.object(projectSchemaObject)

export type CreateProjectRequestBody = z.infer<typeof CreateProjectResponseSchema>
export type CreateProjectResponse = z.infer<typeof CreateProjectResponseSchema>
