import z from "zod"
import { UnprocessedSchema } from "./Unprocessed"

// export const ListUnprocessedResponseSchema = z.object({
//   message: z.string(),
//   data: z.array(UnprocessedSchema),
// })

export const ListUnprocessedResponseSchema = z.array(UnprocessedSchema)

export type ListUnprocessedResponse = z.infer<typeof ListUnprocessedResponseSchema>
