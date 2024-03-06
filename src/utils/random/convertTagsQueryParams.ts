import { type Tag } from "@/types/Action"

export default function convertTagsQueryParamsToString(tags: any): string {
  // I know whats happening
  // this conversion needs to be done in the hook
  // console.log("original tags", tags)
  let tagsString

  if (Array.isArray(tags)){
    // console.log("is array")
    tagsString = tags.map(tag => `"${tag?.value ?? tag}"`).join(',')
    tagsString = "[" + tagsString + "]"

  } else if (typeof tags == "object"){
    // console.log("not array")
    // console.log("typeof tags", typeof tags, tags, typeof [{h: "l"}], {hello: "world"}, Array.isArray([{h: "l"}]), Array.isArray(tags) )
    // console.log(tags, tags[0], queryParams
    tagsString = `["${queryParams?.tags.value}"]`

  } else if (typeof tags == "string"){
    tagsString = tags

  } else {
    console.error("Could not parse tags in listActions service")
  }

  // console.log("used tagString", tagsString)
  return tagsString
}

export function tagsStringToArray(allTags: [Tag] | null, tagsString?: string): Array<string> | null {
  // if (!allTags || !tagsString || !tagsString.length) return [""]
  if (!allTags || !tagsString || !tagsString.length) return null

  // remove surrounding brackets: '[', ']'
  let formattedTags = tagsString.substring(1, tagsString.length - 1).split(",")

  const foundTags = formattedTags.map((tag: string) => {
    const tagObject = allTags.filter((tagObject: Tag) =>
      tagObject && tagObject.value === tag.substring(1, tag.length - 1)
    )
    // return the match if we found it
    // return tagObject.length ? tagObject[0] : ""
    return tagObject.length ? tagObject[0] : null
  })
  return (foundTags && foundTags.length) ? foundTags : null
}
