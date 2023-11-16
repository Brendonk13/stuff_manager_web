import z from "zod"
import { type Tag, TagSchema } from "./Common"

export const StepSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "No 1 letter descriptions").optional(),
  // date: z.date().optional(),
  // todo: change this back to date !!!!
  date: z.date().optional(),
  somedayMaybe: z.boolean(), // todo: decide if this should just be another tag -- nah then i gotta filter that out everywhere when showing tags
  delegate: z.boolean(),
  cannotBeDoneYet: z.boolean(),
  requiredContext: z.array(TagSchema).optional(),
  tags: z.array(TagSchema).optional(),
  // tags: z.array(z.object( // was working
  //   { value: z.string() }
  // )),
})

export const CreateStepSchema = {
  body : StepSchema,
}

export type Step = z.infer<typeof StepSchema>
