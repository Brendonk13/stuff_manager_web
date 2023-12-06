import z from "zod"


export const UnprocessedWithIdSchema = {
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  id: z.number(),
}

export const UnprocessedSchema = z.object({
  title: UnprocessedWithIdSchema.title,
  description: UnprocessedWithIdSchema.description,
})

// ========================= create unproccessed =========================
export const CreateUnprocessedRequestSchema = {
  body: UnprocessedSchema,
}

export const CreateUnprocessedResponseSchema = z.object({
  message: z.string(),
  data: z.object(UnprocessedWithIdSchema)
})

// ========================= get unproccessed ============================
export const GetUnprocessedResponseSchema = z.object({
  message: z.string(),
  data: UnprocessedSchema
})

export type CreateUnprocessedRequestBody = z.infer<typeof CreateUnprocessedRequestSchema.body>
export type CreateUnprocessedResponse = z.infer<typeof CreateUnprocessedResponseSchema>

// todo: this doesnt have an id returned
export type GetUnprocessedResponse = z.infer<typeof GetUnprocessedResponseSchema>
export type Unprocessed = z.infer<typeof UnprocessedSchema>
