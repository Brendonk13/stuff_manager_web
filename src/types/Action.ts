import z from "zod"
import { ProjectSchema, UnrestrictedProjectSchema } from "./Project"
import { TagSchema } from "./Tag"



// todo: how to enforce only having one of somedayMaybe, delegate, cannotBeDoneYet to true
// or maybe is it best to allow things to be someday/maybe as well as cannotBeDoneYet
// no, cannotBeDoneYet should be kept clutter free

// todo: add created field
const actionSchemaObject = {
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "No 1 letter descriptions").optional(),
  date: z.date().optional(),
  energy: z.number().optional(),
  somedayMaybe: z.boolean(), // todo: decide if this should just be another tag -- nah then i gotta filter that out everywhere when showing tags
  delegated: z.boolean(),
  cannotBeDoneYet: z.boolean(),
  required_context: z.array(TagSchema).optional(),
  tags: z.array(TagSchema).optional(),
}

const actionSchemaObjectWithProject = {
  ...actionSchemaObject,
  project: ProjectSchema.optional(),
}

export const CreateItemActionSchema = z.object(actionSchemaObject).omit({ id: true })
export type CreateItemAction = z.infer<typeof CreateItemActionSchema>

export const ActionSchema = z.object(actionSchemaObject).omit({
  somedayMaybe: true,
  delegated: true,
  cannotBeDoneYet: true,
})

export type Action = z.infer<typeof ActionSchema>

export const GetActionSchema = z.object(actionSchemaObjectWithProject).omit({
    somedayMaybe: true,
    delegated: true,
    cannotBeDoneYet: true
})
export type GetActionResponse = z.infer<typeof GetActionSchema>


// this request just returns the action
const EditActionResponseSchema = z.object(actionSchemaObjectWithProject).omit({
  somedayMaybe: true,
  delegated: true,
  cannotBeDoneYet: true,
  tags: true,
  required_context: true,
})
export type EditActionResponse = z.infer<typeof EditActionResponseSchema>


export const ListActionSchema = z.array(GetActionSchema)
export type ListActionResponse = z.infer<typeof ListActionSchema>

export const tagQueryParamSchemaObject = {
  tags: TagSchema.optional().nullable().transform(tag => {
      if (!tag){ return null } // must return null to not use this query param

      const data = Array.isArray(tag)
        ? tag
        : [tag]
      console.log("LIST TAG SCHEMA", data)
      return data
  }),
}

// need optional and nullable since the default value needs to be null NOT undefined (form values cannot have initial value undefined then change)
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
  // required_context: actionSchemaObject.required_context.nullable(),
  required_context: tagQueryParamSchemaObject.tags,
})
export type ListActionQueryParams = z.infer<typeof ListActionQuerySchema>

export const EditActionSchema = z.object(
  {...actionSchemaObjectWithProject, project: ProjectSchema.optional().nullable(), }
).omit({
  somedayMaybe: true,
  delegated: true,
  cannotBeDoneYet: true
})
export type EditActionBody = z.infer<typeof EditActionSchema>

// =============================== defaults ===============================

export const defaultAction: Action = {
  id: 0,
  title: "",
  description: "",
  energy: 0,
}

export const defaultCreateItemAction: CreateItemAction = {
  title: "",
  description: "",
  somedayMaybe: false,
  cannotBeDoneYet: false,
  delegated: false,
  energy: 0,
}


export const defaultActionQueryParams: ListActionQueryParams = {
  title: null,
  project_id: null,
  energy: null,
  date: null, // make this date ranges maybe one day idk
  tags: null,
  required_context: null,
}
