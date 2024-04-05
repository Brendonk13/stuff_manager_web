import z from "zod"
import { UnprocessedSchema } from "./Unprocessed"

// export const CreateUnprocessedRequestSchema = {
//   body: UnprocessedSchema.omit({id: true}),
// }

export const CreateUnprocessedSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
})

// export const CreateUnprocessedResponseSchema = z.object({
//   message: z.string(),
//   data: UnprocessedSchema
// })

export const CreateUnprocessedResponseSchema = UnprocessedSchema

export type CreateUnprocessedRequestBody = z.infer<typeof CreateUnprocessedSchema>
export type CreateUnprocessedResponse = z.infer<typeof CreateUnprocessedResponseSchema>


export const defaultCreateUnprocessed: CreateUnprocessedRequestBody = {
  title: "",
  description: "",
}
