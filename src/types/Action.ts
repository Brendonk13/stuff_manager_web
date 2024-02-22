import z from "zod"

export const TagSchema = z.object({
  value: z.string().min(1, "Please enter a value"),
})

export type Tag = z.infer<typeof TagSchema>

// todo: cleanup project
export const ProjectSchema = z.object({
  name: z.string(),
  notes: z.string().optional(),
  // id: z.number().optional(),
  id: z.number(),
})

export type Project = z.infer<typeof ProjectSchema>

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
  requiredContext: z.array(TagSchema).optional(),
  tags: z.array(TagSchema).optional(),
}

export const ActionSchema = z.object(actionSchemaAll)

export const CreateActionSchema = {
  body : ActionSchema,
}

export type Action = z.infer<typeof ActionSchema>

// todo: delete lol and just have steps
// todo: change from create item to createActionable!!!!
export const CreateItemSchema = z.object({
    // todo: delete title, description since those will be in the steps
  // currently using this as "project" name, maybe I should make this field required when have multiple steps
  unprocessedId: z.number(),
  project: ProjectSchema,
  actions: z.array(ActionSchema).optional(),
  // todo: add notes here
})

// todo: delete lol and just have steps
export const CreateItemRequestSchema = z.object({
    // todo: delete title, description since those will be in the steps
  // currently using this as "project" name, maybe I should make this field required when have multiple steps
  body: CreateItemSchema,
})

export const CreateItemResponseSchema = z.object({ message: z.string() })
export type CreateItemResponse = z.infer<typeof CreateItemResponseSchema>

export type CreateItem = z.infer<typeof CreateItemSchema>
// export type CreateItemRequest = z.infer<typeof Crea>

export const ListActionSchema = z.array(z.object(
{
  ...actionSchemaAll,
  id: z.number(),
  project: ProjectSchema.optional(),
}).omit({
    somedayMaybe: true,
    delegated: true,
    cannotBeDoneYet: true
}))

export type ListActionResponse = z.infer<typeof ListActionSchema>

// need optional and nullable since the default value needs to be null NOT undefined (form values cannot have initial value undefined then change)
export const ListActionQuerySchema = z.object({
  title: actionSchemaAll.title.optional().nullable(),
  // project_id: z.number().optional().nullable(),
  // does this mean we want a project to transform it
  project_id: ProjectSchema.optional().nullable().transform(project => project?.id ?? null),
  energy: actionSchemaAll.energy.nullable(),
  date: actionSchemaAll.date.nullable(),
  tags: actionSchemaAll.tags.nullable(),
  requiredContext: actionSchemaAll.requiredContext.nullable(),
})
export type ListActionQueryParams = z.infer<typeof ListActionQuerySchema>

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
  date: null,
  tags: null,
  requiredContext: null,
}


export const defaultProject: Project = {
  name: "",
  notes: "",
  id: 0,
}
