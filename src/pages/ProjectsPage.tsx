import PageLayout from "@/layouts/Page"
import useListProjects from "@/hooks/api/useListProjects"

export default function ProjectsPage(){

  const projects = useListProjects()
  console.log("projects", projects?.data)

  // todo: decide what to show here
  // ie: show just name and descriptions of projects then click to view more details?
  // or do we do it like tallo where its an infinite scroll then you click projects to view a drop down of info
  // THE ANSWER is dependant on what data we care about for projects
  return (
    <PageLayout>
      {projects?.data && projects?.data?.map(project => {
        console.log("hello", project.name)
        return (
          <span>
            {project.name}
            <br/>
          </span>
        )
      })}
    </PageLayout>
  )
}
