import z from "zod"

export const TagSchema = z.object({
  value: z.string().min(1, "Please enter a value"),
})

export type Tag = z.infer<typeof TagSchema>
