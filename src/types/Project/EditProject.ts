import z from "zod"
import { projectSchemaObject } from "./Project"

export const EditProjectSchema = z.object({
  name: projectSchemaObject.name.optional(),
  notes: projectSchemaObject.notes,
  id: projectSchemaObject.id,
})

export type EditProjectBody = z.infer<typeof EditProjectSchema>
export type EditProjectResponse = EditProjectBody

