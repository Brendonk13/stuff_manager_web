import z from "zod"


export const unprocessedSchemaObject = {
  id: z.number(),
  created: z.string(),
  title: z.string(),
  description: z.string(),
}
export const UnprocessedSchema = z.object(unprocessedSchemaObject)
