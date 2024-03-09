// import { useSession } from '@clerk/clerk-react'
import getCookie from "@/utils/getCookie"


export default function useWriteBearer(){
  // saves the clerk cookie to clipboard so I can paste into postman
  // const session = useSession()
  // console.log("useWriteBearer", {session})

  const token = `Bearer ${getCookie('__session')}`
  navigator.clipboard.writeText(token as string)
}
