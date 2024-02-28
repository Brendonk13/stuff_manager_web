import { useEffect, useContext } from "react"
import { NavigationType, UNSAFE_NavigationContext } from "react-router-dom"

export default function useBackListener (callback: (...args: any) => void){
  const navigator = useContext(UNSAFE_NavigationContext).navigator

  useEffect(() => {
    const listener = ({ location, action }) => {
      console.log("listener", { location, action })
      if (action === NavigationType.Pop) {
        callback({ location, action })
      }
    };

    const unlisten = navigator.listen(listener)
    return unlisten
  }, [callback, navigator])
  console.log("we live baby")
}

