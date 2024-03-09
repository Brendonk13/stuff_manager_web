import z from "zod"

const TagObject = {
  id: z.number().optional(), // list_actions returns tags without id's, todo: should I return those Id's?
  value: z.string().min(1, "Please enter a value"),
}
export const TagSchema = z.object(TagObject)
export type Tag = z.infer<typeof TagSchema>

export const ListTagSchema = z.array(TagSchema)
export type ListTagResponse = z.infer<typeof ListTagSchema>

export type ListContextResponse = ListTagResponse
