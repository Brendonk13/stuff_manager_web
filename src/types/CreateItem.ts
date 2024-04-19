import z from "zod"
import { UnrestrictedProjectSchema, defaultProject } from "./Project/Project"
import { CreateItemActionSchema } from "./Action/CreateAction"
import { defaultCreateItemAction } from "./Action/CreateAction"

// todo: delete lol and just have steps
// todo: change from create item to createActionable!!!!
export const CreateItemSchema = z.object({
    // todo: delete title, description since those will be in the steps
  // currently using this as "project" name, maybe I should make this field required when have multiple steps
  unprocessedId: z.number(),
  project: UnrestrictedProjectSchema,
  actions: z.array(CreateItemActionSchema).optional(),
  // todo: add notes here
})
export type CreateItem = z.infer<typeof CreateItemSchema>

// todo: delete lol and just have steps
export const CreateItemRequestSchema = z.object({
    // todo: delete title, description since those will be in the steps
  // currently using this as "project" name, maybe I should make this field required when have multiple steps
  body: CreateItemSchema,
})

export const CreateItemResponseSchema = z.object({ message: z.string() })
export type CreateItemResponse = z.infer<typeof CreateItemResponseSchema>


export const defaultCreateItem: CreateItem = {
  unprocessedId: 0,
  project: defaultProject,
  actions: [defaultCreateItemAction],
}


