import z from "zod"
import { actionSchemaObject, actionSchemaObjectWithProject, tagQueryParamSchemaObject } from "./Action"
import { UnrestrictedProjectSchema } from "@/types/Project/Project"

export const ListActionSchema = z.array(z.object(actionSchemaObjectWithProject))

export type ListActionResponse = z.infer<typeof ListActionSchema>

export enum orderByOptions {
  title = "title",
  energy = "energy",
  date = "date",
  project_id = "project_id",
  completed = "completed",
  deleted = "deleted",
  created = "created",
}

export const orderByQueryParamSchemaObject = {
  orderBy: z.array(z.object({
    value: z.nativeEnum(orderByOptions),
    ascending: z.boolean(),
  })).nullable()
  // .transform(orderBy => {
  //   if (!orderBy){ return null } // must return null to not use this query param
  //   const isArray = Array.isArray(orderBy)
  //   if (isArray && !orderBy.length){
  //     return null
  //   }

  //   const data = isArray
  //     ? orderBy
  //     : [orderBy]
  //   console.log("LIST orderBy SCHEMA", data)
  //   return data
  // }),
}


export const listActionQuerySchemaObject = {
  title: z.string().nullable(),
  project_id: UnrestrictedProjectSchema.optional().nullable().transform(project => project?.id ?? null),
  energy: actionSchemaObject.energy.nullable(),
  date: actionSchemaObject.date.nullable(),
  // tags: z.array(TagSchema).optional().nullable().transform(tag => [tag] ),
  // todo: why is the transform not running when I use z.array
  tags: tagQueryParamSchemaObject.tags,
  completed: z.boolean().nullable(),
  deleted: z.boolean().nullable(),
  // orderBy: z.array(z.boolean().or(z.nativeEnum(orderByOptions))),
  orderBy: orderByQueryParamSchemaObject.orderBy,
  // orderByAscending: z.boolean(),
  requiredContext: tagQueryParamSchemaObject.tags,
}

export const ListActionQuerySchema = z.object(listActionQuerySchemaObject)
export type ListActionQueryParams = z.infer<typeof ListActionQuerySchema>

// export const defaultOrderby = [{value: orderByOptions.created, ascending: true}]
export const defaultOrderby = {value: orderByOptions.created, ascending: true}
export type OrderBy = z.infer<typeof orderByQueryParamSchemaObject.orderBy>

export const defaultActionQueryParams: ListActionQueryParams = {
  title: null,
  project_id: null,
  energy: null,
  date: null, // make this date ranges maybe one day idk
  orderBy: null,
  // orderBy: defaultOrderby,
  // orderBy: [{value: orderByOptions.created, ascending: true}],
  // orderByAscending: true,
  completed: null,
  deleted: null,
  tags: null,
  requiredContext: null,
}

