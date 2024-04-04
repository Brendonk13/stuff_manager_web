import z from "zod"


export const unprocessedSchemaObject = {
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  id: z.number(),
}
export const UnprocessedSchema = z.object(unprocessedSchemaObject)
