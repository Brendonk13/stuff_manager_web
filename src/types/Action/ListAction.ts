import z from "zod"
import { actionSchemaObject, actionSchemaObjectWithProject, tagQueryParamSchemaObject } from "./Action"
import { UnrestrictedProjectSchema } from "@/types/Project/Project"

export const ListActionSchema = z.array(z.object(actionSchemaObjectWithProject))

export type ListActionResponse = z.infer<typeof ListActionSchema>

export const ListActionQuerySchema = z.object({
  // title: actionSchemaObject.title.optional().nullable(),
  title: z.string().optional().nullable(),
  // title: actionSchemaObject.title.optional().nullable(),
  // project_id: z.number().optional().nullable(),
  // does this mean we want a project to transform it
  project_id: UnrestrictedProjectSchema.optional().nullable().transform(project => project?.id ?? null),
  energy: actionSchemaObject.energy.nullable(),
  date: actionSchemaObject.date.nullable(),
  // tags: z.array(TagSchema).optional().nullable().transform(tag => [tag] ),
  // todo: why is the transform not running when I use z.array
  tags: tagQueryParamSchemaObject.tags,

  // tags: actionSchemaObject.tags.nullable().transform(tag => [tag] ),
  // tags: actionSchemaObject.tags.nullable().transform(tag => {
  //     return Array.isArray(tag)
  //       ? tag
  //       : [tag]
  // }),
  // requiredContext: actionSchemaObject.requiredContext.nullable(),
  requiredContext: tagQueryParamSchemaObject.tags,
})
export type ListActionQueryParams = z.infer<typeof ListActionQuerySchema>


export const defaultActionQueryParams: ListActionQueryParams = {
  title: null,
  project_id: null,
  energy: null,
  date: null, // make this date ranges maybe one day idk
  tags: null,
  requiredContext: null,
}

