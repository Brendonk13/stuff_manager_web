import z from "zod"
import { ProjectSchema } from "./Project"
import { TagSchema } from "./Tag"

// const TagObject = {
//   id: z.number().optional(), // list_actions returns tags without id's, todo: should I return those Id's?
//   value: z.string().min(1, "Please enter a value"),
// }

// export const TagSchema = z.object(TagObject)
// export type Tag = z.infer<typeof TagSchema>

// // export const ListTagSchema = z.object({
// //   message: z.string(),
// //   data: z.array(TagSchema),
// // })

// export const ListTagSchema = z.array(TagSchema)

// export type ListTagResponse = z.infer<typeof ListTagSchema>
// export type ListContextResponse = ListTagResponse



// todo: how to enforce only having one of somedayMaybe, delegate, cannotBeDoneYet to true
// or maybe is it best to allow things to be someday/maybe as well as cannotBeDoneYet
// no, cannotBeDoneYet should be kept clutter free

// this is here so I can reuse these values
const actionSchemaAll = {
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

export const ActionSchema = z.object(actionSchemaAll)
export type Action = z.infer<typeof ActionSchema>

export const CreateActionSchema = {
  body : ActionSchema,
}


export const GetActionSchema = z.object(
{
  ...actionSchemaAll,
  id: z.number(),
  project: ProjectSchema.optional(),
}).omit({
    somedayMaybe: true,
    delegated: true,
    cannotBeDoneYet: true
})
export type GetActionResponse = z.infer<typeof GetActionSchema>
export type EditActionResponse = GetActionResponse

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
  title: actionSchemaAll.title.optional().nullable(),
  // project_id: z.number().optional().nullable(),
  // does this mean we want a project to transform it
  project_id: ProjectSchema.optional().nullable().transform(project => project?.id ?? null),
  energy: actionSchemaAll.energy.nullable(),
  date: actionSchemaAll.date.nullable(),
  // tags: z.array(TagSchema).optional().nullable().transform(tag => [tag] ),
  // todo: why is the transform not running when I use z.array
  tags: tagQueryParamSchemaObject.tags,

  // tags: actionSchemaAll.tags.nullable().transform(tag => [tag] ),
  // tags: actionSchemaAll.tags.nullable().transform(tag => {
  //     return Array.isArray(tag)
  //       ? tag
  //       : [tag]
  // }),
  // required_context: actionSchemaAll.required_context.nullable(),
  required_context: tagQueryParamSchemaObject.tags,
})
export type ListActionQueryParams = z.infer<typeof ListActionQuerySchema>

export const EditActionSchema = z.object(
{
  ...actionSchemaAll,
  id: z.number(),
}).omit({
    somedayMaybe: true,
    delegated: true,
    cannotBeDoneYet: true
})
export type EditActionBody = z.infer<typeof EditActionSchema>

// =============================== defaults ===============================

export const defaultAction: Action = {
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
