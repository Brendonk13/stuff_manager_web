import z from "zod"

export const TagSchema = z.object({
  value: z.string().min(1, "Please enter a value"),
})

export type Tag = z.infer<typeof TagSchema>

export type ProcessItemStep = {
  label: string
  completed: boolean
}

// todo: how to enforce only having one of somedayMaybe, delegate, cannotBeDoneYet to true
// or maybe is it best to allow things to be someday/maybe as well as cannotBeDoneYet
// no, cannotBeDoneYet should be kept clutter free

export const StepSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "No 1 letter descriptions").optional(),
  date: z.date().optional(),
  energy: z.number().optional(),
  somedayMaybe: z.boolean(), // todo: decide if this should just be another tag -- nah then i gotta filter that out everywhere when showing tags
  delegate: z.boolean(),
  cannotBeDoneYet: z.boolean(),
  requiredContext: z.array(TagSchema).optional(),
  tags: z.array(TagSchema).optional(),
})

export const CreateStepSchema = {
  body : StepSchema,
}

export type Step = z.infer<typeof StepSchema>

// todo: cleanup project
export const ProjectSchema = z.object({
  name: z.string(),
  notes: z.string().optional(),
  // id: z.number().optional(),
  id: z.number(),
})

export type Project = z.infer<typeof ProjectSchema>

// todo: delete lol and just have steps
// todo: change from create item to createActionable!!!!
export const CreateItemSchema = z.object({
    // todo: delete title, description since those will be in the steps
  // currently using this as "project" name, maybe I should make this field required when have multiple steps
  unprocessedId: z.number(),
  project: ProjectSchema,
  steps: z.array(StepSchema),
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



// =============================== defaults ===============================

export const defaultStep: Step = {
  title: "",
  description: "",
  somedayMaybe: false,
  cannotBeDoneYet: false,
  delegate: false,
  energy: 0,
}

export const defaultProject: Project = {
  name: "",
  notes: "",
  id: 0,
}
