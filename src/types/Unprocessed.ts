import z from "zod"


export const unprocessedSchemaObject = {
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  id: z.number(),
}
export const UnprocessedSchema = z.object(unprocessedSchemaObject)


// ========================= CREATE =========================
export const CreateUnprocessedRequestSchema = {
  body: UnprocessedSchema.omit({id: true}),
}

export const CreateUnprocessedResponseSchema = z.object({
  message: z.string(),
  data: UnprocessedSchema
})

export type CreateUnprocessedRequestBody = z.infer<typeof CreateUnprocessedRequestSchema.body>
export type CreateUnprocessedResponse = z.infer<typeof CreateUnprocessedResponseSchema>


// ========================= LIST ===========================
export const ListUnprocessedResponseSchema = z.object({
  message: z.string(),
  data: z.array(UnprocessedSchema),
})
export type ListUnprocessedResponse = z.infer<typeof ListUnprocessedResponseSchema>


// ========================= GET ============================
export const GetUnprocessedResponseSchema = z.object({
  message: z.string(),
  data: UnprocessedSchema,
})
export type GetUnprocessedResponse = z.infer<typeof GetUnprocessedResponseSchema>


// ========================= DELETE =========================
export const DeleteUnprocessedResponseSchema = z.object({
  message: z.string(),
})
export type DeleteUnprocessedResponse = z.infer<typeof DeleteUnprocessedResponseSchema>
