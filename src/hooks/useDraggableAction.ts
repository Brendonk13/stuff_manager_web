import interact from "interactjs"
// import { type React 
// import { type SyntheticEvent } from 'react'
import completedIcon from "@/assets/icons8-ok.svg"
import deleteIcon from "@/assets/icons8-delete-48.svg"

interface useDraggableActionProps {
  // setCompleted: React.Dispatch<React.SetStateAction<boolean>>
  // setDeleted: React.Dispatch<React.SetStateAction<boolean>>
  setCompletedActionId: React.Dispatch<React.SetStateAction<number>>
  setDeletedActionId: React.Dispatch<React.SetStateAction<number>>
}

export default function useDraggableAction({setCompletedActionId, setDeletedActionId} : useDraggableActionProps){
  const maxMovement = 47

  interact("#swipeable_action").styleCursor(false).draggable({
    // startAxis: 'x',
    lockAxis: 'x',
    // cursorChecker: false,
    inertia: false,
    // autoScroll: true,
    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,
    },
    onend : function (event) {
      const target = event.target
      const y = (parseFloat(target.getAttribute('data-y')) || 0)
      // console.log("DONE == == direction swiped:", target.swiped, "diplacement", target.maxDisplacement)
      // number picked s.t the image is visible
      if (target.maxDisplacement >= maxMovement){
        console.log("COMPLETED SWIPE, direction:", target.swiped, "displacement", target.maxDisplacement)
        const actionId = Number(target.dataset.actionid)
        // console.log({data: })
        if (target.swiped === "right"){
          setCompletedActionId(actionId)
        } else if (target.swiped === "left"){
          setDeletedActionId(actionId)
        }
        target.swiped = "" // reset value
      }
      target.maxDisplacement = 0 // reset value
      target.style.transform = 'translate(' + 0 + 'px, ' + y + 'px)'
      target.setAttribute('data-x', 0)
    },
    modifiers: [
        interact.modifiers.restrictRect({
            // keep the element within the area of it's parent
            restriction: 'parent',
            endOnly: true
        })
    ],
  })


  function dragMoveListener (event) {
    const target = event.target
    // this is to prevent setting target.swiped incorrectly since this event fires when the
    // thing gets dragged back into position causing the wrong swipe direction to be recorded
    if (event.dx < -100 || 100 < event.dx){
        return
    }
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0)

    if (x >= maxMovement){
        x = maxMovement
        target.swiped = "right"
    } else if (x <= -maxMovement) {
        x = -maxMovement
        target.swiped = "left"
    }

    // this event fires many times while dragging, we set the maximum displacement per swipe here
    target.maxDisplacement = parseInt(Math.max(Math.abs(x), target.maxDisplacement ?? 0))
    // console.log("x", parseInt(x), "dx", parseInt(event.dx), "maxDisplacement", target.maxDisplacement, "abs x", Math.abs(parseInt(x))) //, "added", parseInt(x + event.dx))

    const parent = target.parentElement
    if (x > 0){
        // parent.style.background = "url(src/assets/icons8-ok.svg) 1% center no-repeat"
        parent.style.background = `url(${completedIcon}) 1% center no-repeat`
    } else if (x < 0) {
        parent.style.background = `url(${deleteIcon}) 99% center no-repeat`
    }
    console.log(parent.style.background)

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    // update the posiion attributes
    target.setAttribute('data-x', x)
  }
}
