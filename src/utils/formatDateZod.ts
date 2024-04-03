import dayjs from "dayjs"

export default function transformDate(date?: string | null) {
  return date ? dayjs(date) : null
}

