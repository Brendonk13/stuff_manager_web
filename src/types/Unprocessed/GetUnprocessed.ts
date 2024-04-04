import z from "zod"
import { UnprocessedSchema } from "./Unprocessed"


// export const GetUnprocessedResponseSchema = z.object({
//   message: z.string(),
//   data: UnprocessedSchema,
// })

export const GetUnprocessedResponseSchema = UnprocessedSchema

export type GetUnprocessedResponse = z.infer<typeof GetUnprocessedResponseSchema>
