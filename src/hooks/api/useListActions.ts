import { useQuery } from '@tanstack/react-query'
import { listActions, actionQueryKeys } from "@/api/ActionsService"
import { type ListActionQueryParams} from "@/types/Action"
import convertTags from "@/utils/random/convertTagsQueryParams"


export default function useListActions(queryParams?: ListActionQueryParams){
  // if (queryParams?.tags){
  //   queryParams.tags = convertTags(queryParams.tags)
  // }
  // if (queryParams?.required_context){
  //   queryParams.required_context = convertTags(queryParams.required_context)
  // }

  // this didnt work cuz queryParams.title == "" is a falsy value and the iff fails
  // if (queryParams?.title && queryParams.title === ""){
  //   queryParams.title = null
  // }
  // if (queryParams?.project_id){
  //   queryParams.project_id = null
  // }

  // console.log("outside usequery", {queryParams})

  return useQuery({
    queryKey: [actionQueryKeys.LIST, queryParams],
    queryFn: async () => {
      // console.log("useListActions", {queryParams})
      const data = await listActions(queryParams)
      // console.log("========= HOOK", {data})
      return data
    },
  })
}
