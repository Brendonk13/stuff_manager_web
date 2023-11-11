import z from "zod"
import { type Step, StepSchema } from "@/types/schemas"
import { TagSchema } from "./Common"

export type ProcessItemStep = {
  label: string
  completed: boolean
}

// todo: how to enforce only having one of somedayMaybe, delegate, cannotBeDoneYet to true
// or maybe is it best to allow things to be someday/maybe as well as cannotBeDoneYet
// no, cannotBeDoneYet should be kept clutter free

// todo: Change name?
export const CreateItemSchema = z.object({
  // body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    steps: z.array(StepSchema),
    isProject: z.boolean(),
    // backend uses this value to determine if its a project or not
    // specificDate: z.date().optional(),
    // tags: z.array(TagSchema),
    // context: z.array(TagSchema),
  // }),
})

export type CreateItem = z.infer<typeof CreateItemSchema>
