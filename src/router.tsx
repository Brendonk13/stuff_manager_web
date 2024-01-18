import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SidebarLayout from "@/layouts/SidebarLayout"
import HomePage from "@/pages/HomePage"
import ProcessItemPage from "@/pages/ProcessItemPage"
import ProjectsPage from "@/pages/ProjectsPage"
import ProjectDetailPage from "@/pages/ProjectsDetailPage"
import ActionsPage from "@/pages/ActionsPage"

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        {/* Note: can also have a nested route without a path so that any nested guy has the layout (kind what I've done here) */}
        {/* <Route path="/" element={<SidebarLayout />}> */}
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<HomePage />} />
          <Route path="stuff/new" element={<div> This shows a list of all unprocessed stuff </div>} />
          {/* todo: wtf is this, not used I think^^^^ */}
          <Route path="stuff/new/:unprocessedId" element={<ProcessItemPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="actions" element={<ActionsPage />} />
          {/* <Route path="actions/:actionId" element={<ActionsPage />} /> */}
        </Route>
        {/* <Route path="/sign-in" element={<SignInPage />} /> */}
        {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
