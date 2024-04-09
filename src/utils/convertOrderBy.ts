import { defaultOrderby, type OrderBy } from "@/types/Action/ListAction"

export function convertOrderByToArray(orderBy: string): OrderBy {
  // strangely cant just do [defaultOrderby] yet it works when I push this value later
  const newOrderBy = [{value: "created", ascending: "true"}]

  const orderByArray = orderBy.replace("[", "").replace("]", "").split(",")
  // console.log({orderByArray}, {newOrderBy})
  orderByArray.map((orderByQuery, index) => {
    // console.log("orderBy array element", orderByQuery, "params length - 1", newOrderBy.length - 1)
    const addingTo: OrderBy = newOrderBy[newOrderBy.length - 1]
    if (index % 2 == 0){
      const value = orderByQuery
      addingTo.value = value
    } else {
      const ascending = orderByQuery === "true" ? true : false
      addingTo.ascending = ascending

      // add another object if there are more params
      if (index < orderByArray.length - 1){
        newOrderBy[newOrderBy.length - 1] = addingTo
        newOrderBy.push(defaultOrderby)
        // console.log("added another")
      }
    }
    // console.log(newOrderBy)
  })

  return newOrderBy
}

export function convertOrderByToString(orderBy: any): string {
  // I know whats happening
  // this conversion needs to be done in the hook
  // console.log("original orderBy", {orderBy})
  let orderByString = null

  if (Array.isArray(orderBy)){
    // console.log("order by is array")
    orderByString = orderBy.map(orderByQuery => {
      const val = `${orderByQuery?.value},${orderByQuery?.ascending}`
      // console.log("order by value", {val})
      return val
    }).join(',')
    // console.log("orderbystring before adding brackets", orderByString, "with->", "[" + orderByString + "]")
    orderByString = "[" + orderByString + "]"

  } else if (typeof tags == "object"){
    // console.log("orderby is object")
    // console.log("typeof orderBy", typeof orderBy, orderBy, typeof [{h: "l"}], {hello: "world"}, Array.isArray([{h: "l"}]), Array.isArray(orderBy) )
    // console.log(orderBy, orderBy[0], queryParams
    orderByString = `[${orderBy.value},${orderBy.ascending}]`

  } else if (typeof orderBy == "string"){
    // console.log("orderby is string")
    orderByString = orderBy

  } else {
    console.error("Could not parse orderBy in listActions service")
  }

  // console.log("used tagString", orderByString)
  return orderByString
}
