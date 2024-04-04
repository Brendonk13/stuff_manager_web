import z from "zod"
import { ProjectSchema } from "@/types/Project/Project"
import { TagSchema } from "../Tag"
import dayjs, { type Dayjs } from 'dayjs'
import { actionCompletionObject } from "./ActionCompletion"

// todo: add completed field

// todo: how to enforce only having one of somedayMaybe, delegate, cannotBeDoneYet to true
// or maybe is it best to allow things to be someday/maybe as well as cannotBeDoneYet
// no, cannotBeDoneYet should be kept clutter free

// todo: add created field
export const actionSchemaObject = {
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "No 1 letter descriptions").optional(), // todo: dont require descriptions -- title only is sick
  date: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').optional().nullable().transform(date => date?.toISOString() ?? null),
  // deletedDate: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').optional().nullable().transform(date => date?.toISOString() ?? null),
  // completedDate: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').optional().nullable().transform(date => date?.toISOString() ?? null),
  deletedDate: z.string().nullable(),
  completedDate: z.string().nullable(),
  completed: z.boolean(),
  completionNotes: z.object(actionCompletionObject).nullable(),
  energy: z.number().optional(),
  requiredContext: z.array(TagSchema).optional(),
  tags: z.array(TagSchema).optional(),
}

export const actionSchemaObjectWithProject = {
  ...actionSchemaObject,
  project: ProjectSchema.optional(),
}


export const ActionSchema = z.object(actionSchemaObject)
export type Action = z.infer<typeof ActionSchema>


export const tagQueryParamSchemaObject = {
  tags: TagSchema.optional().nullable().transform(tag => {
      if (!tag){ return null } // must return null to not use this query param

      const data = Array.isArray(tag)
        ? tag
        : [tag]
      console.log("LIST TAG SCHEMA", data)
      return data
  }),
}


export const defaultAction: Action = {
  id: 0,
  title: "",
  description: "",
  energy: 0,
  deletedDate: null,
  completedDate: null,
  completed: false,
  date: null,
  completionNotes: null,
}

