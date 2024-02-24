
export default function convertTagsQueryParamsToString(tags: any): string {
  // I know whats happening
  // this conversion needs to be done in the hook
  console.log("original tags", tags)
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

  console.log("used tagString", tagsString)
  return tagsString
}
