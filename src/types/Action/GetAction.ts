import z from "zod"
import { actionSchemaObjectWithProject } from "./Action"

export const GetActionSchema = z.object(actionSchemaObjectWithProject)
export type GetActionResponse = z.infer<typeof GetActionSchema>
