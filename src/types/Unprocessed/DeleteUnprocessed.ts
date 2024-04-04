import z from "zod"

export const DeleteUnprocessedResponseSchema = z.object({
  message: z.string(),
})
export type DeleteUnprocessedResponse = z.infer<typeof DeleteUnprocessedResponseSchema>
