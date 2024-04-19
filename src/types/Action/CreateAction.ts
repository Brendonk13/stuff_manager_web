import z from "zod"
import { actionSchemaObject } from "./Action"

export const CreateItemActionSchema = z.object({
  ...actionSchemaObject,
  somedayMaybe: z.boolean(),
  delegated: z.boolean(),
  cannotBeDoneYet: z.boolean(),
}).omit({
  id: true,
  deletedDate: true,
  completedDate: true,
})

export type CreateItemAction = z.infer<typeof CreateItemActionSchema>

export const defaultCreateItemAction: CreateItemAction = {
  title: "",
  description: "",
  somedayMaybe: false,
  cannotBeDoneYet: false,
  delegated: false,
  energy: 0,
  completed: false,
  completionNotes: null,
  date: null,
}


