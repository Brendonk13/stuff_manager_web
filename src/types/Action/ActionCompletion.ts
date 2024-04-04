import z from "zod"
import dayjs, { type Dayjs } from 'dayjs'

// does it make sense to have these as optional when I am always sending them....?????
export const actionCompletionObject = {
  actionId: z.number().optional(),
  startTime: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').optional().nullable().transform(date => date?.toISOString() ?? null),
  endTime: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').optional().nullable().transform(date => date?.toISOString() ?? null),
  duration: z.array(z.number()).optional(),
  notes: z.string().optional(),
  // completed: z.boolean(),
}

export const EditActionCompletionSchema = z.object(actionCompletionObject)
export type EditActionCompletionBody = z.infer<typeof EditActionCompletionSchema>

export type EditActionCompletionResponse = EditActionCompletionBody
export type GetActionCompletionResponse = EditActionCompletionBody


export const defaultActionCompletion: EditActionCompletionBody = {
  actionId: 0,
  startTime: null,
  endTime: null,
}
  // actionId: z.number().optional(),
  // startTime: z.date().optional(),
  // endTime: z.date().optional(),
  // duration: z.number().optional(),
  // notes: z.string().optional(),
  // completed: z.boolean(),
// }

