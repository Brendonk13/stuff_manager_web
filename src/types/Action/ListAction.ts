import z from "zod"
import { actionSchemaObject, actionSchemaObjectWithProject, tagQueryParamSchemaObject } from "./Action"
import { UnrestrictedProjectSchema } from "@/types/Project/Project"

export const ListActionSchema = z.array(z.object(actionSchemaObjectWithProject))

export type ListActionResponse = z.infer<typeof ListActionSchema>

export const ListActionQuerySchema = z.object({
  title: z.string().nullable(),
  project_id: UnrestrictedProjectSchema.optional().nullable().transform(project => project?.id ?? null),
  energy: actionSchemaObject.energy.nullable(),
  date: actionSchemaObject.date.nullable(),
  // tags: z.array(TagSchema).optional().nullable().transform(tag => [tag] ),
  // todo: why is the transform not running when I use z.array
  tags: tagQueryParamSchemaObject.tags,
  completed: z.boolean().nullable(),
  deleted: z.boolean().nullable(),
  requiredContext: tagQueryParamSchemaObject.tags,
})
export type ListActionQueryParams = z.infer<typeof ListActionQuerySchema>


export const defaultActionQueryParams: ListActionQueryParams = {
  title: null,
  project_id: null,
  energy: null,
  date: null, // make this date ranges maybe one day idk
  completed: null,
  deleted: null,
  tags: null,
  requiredContext: null,
}

