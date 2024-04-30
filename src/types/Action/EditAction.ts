import z from "zod"
import dayjs, { type Dayjs } from 'dayjs'

import { actionSchemaObjectWithProject } from "./Action"
// import { actionCompletionObject } from "./ActionCompletion"
// todo: change path
import { ProjectSchema } from "@/types/Project/Project"

// this request just returns the action
const EditActionResponseSchema = z.object(actionSchemaObjectWithProject).omit({
  tags: true,
  contexts: true,
})
export type EditActionResponse = z.infer<typeof EditActionResponseSchema>

export const EditActionSchema = z.object({
  id            : z.number().optional(),
  name          : z.string().optional(),
  description   : z.string().optional(),
  completed     : z.boolean().optional(),
  deleted       : z.boolean().optional(),
  energy        : z.number().optional(),
  project       : ProjectSchema.optional().nullable(),
  date          : actionSchemaObjectWithProject.date.nullable().optional(),
  deletedDate   : actionSchemaObjectWithProject.deletedDate.optional(),
  completedDate : actionSchemaObjectWithProject.completedDate.optional(),
  contexts      : actionSchemaObjectWithProject.contexts,
  tags          : actionSchemaObjectWithProject.tags,
})

export type EditActionBody = z.infer<typeof EditActionSchema>
