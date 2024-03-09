import z from "zod"


export const unprocessedSchemaObject = {
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  id: z.number(),
}

// export const UnprocessedSchema = z.object({
//   title: unprocessedSchemaObject.title,
//   description: unprocessedSchemaObject.description,
// })

// ========================= create unproccessed =========================
export const CreateUnprocessedRequestSchema = {
  body: z.object({
    title: unprocessedSchemaObject.title,
    description: unprocessedSchemaObject.description,
  })
}

export const CreateUnprocessedResponseSchema = z.object({
  message: z.string(),
  data: z.object(unprocessedSchemaObject)
})

// ========================= list unproccessed ===========================
export const ListUnprocessedResponseSchema = z.object({
  message: z.string(),
  data: z.array(z.object(unprocessedSchemaObject)),
})

// ========================= get unproccessed ============================
export const GetUnprocessedResponseSchema = z.object({
  message: z.string(),
  data: z.object(unprocessedSchemaObject),
})

export const DeleteUnprocessedResponseSchema = z.object({
  message: z.string(),
})

export type CreateUnprocessedRequestBody = z.infer<typeof CreateUnprocessedRequestSchema.body>
export type CreateUnprocessedResponse = z.infer<typeof CreateUnprocessedResponseSchema>

// todo: this doesnt have an id returned
export type GetUnprocessedResponse = z.infer<typeof GetUnprocessedResponseSchema>
export type ListUnprocessedResponse = z.infer<typeof ListUnprocessedResponseSchema>
export type DeleteUnprocessedResponse = z.infer<typeof DeleteUnprocessedResponseSchema>
// export type Unprocessed = z.infer<typeof UnprocessedSchema>
