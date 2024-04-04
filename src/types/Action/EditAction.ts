import z from "zod"
import { actionSchemaObjectWithProject } from "./Action"
// import { actionCompletionObject } from "./ActionCompletion"
// todo: change path
import { ProjectSchema } from "@/types/Project/Project"

// this request just returns the action
const EditActionResponseSchema = z.object(actionSchemaObjectWithProject).omit({
  tags: true,
  requiredContext: true,
})
export type EditActionResponse = z.infer<typeof EditActionResponseSchema>

export const EditActionSchema = z.object({
  ...actionSchemaObjectWithProject,
  project: ProjectSchema.optional().nullable(),
})

export type EditActionBody = z.infer<typeof EditActionSchema>
