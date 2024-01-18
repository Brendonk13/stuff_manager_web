import PageLayout from "@/layouts/Page"
import { useParams } from 'react-router-dom'
import useGetProject from "@/hooks/api/useGetProject"

export default function ProjectDetailsPage(){
  const { projectId } = useParams()
  const project = useGetProject(Number(projectId))
  console.log("PROJECT", {project})
  // project: id, name, notes
  // -- need to also show all actions associated with this project
  return (
    <PageLayout>
      project :)
    </PageLayout>
  )
}
