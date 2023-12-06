import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SidebarLayout from "@/layouts/SidebarLayout"
import HomePage from "@/pages/HomePage"
import ProcessItemPage from "@/pages/ProcessItemPage"

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        {/* Note: can also have a nested route without a path so that any nested guy has the layout (kind what I've done here) */}
        {/* <Route path="/" element={<SidebarLayout />}> */}
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<HomePage />} />
          <Route path="stuff/new" element={<div> This shows a list of all unprocessed stuff </div>} />
          <Route path="stuff/new/:unprocessedId" element={<ProcessItemPage />} />
          {/* <Route path="stuff/new/:id" element={<ProcessItemPage />} /> */}
        </Route>
        {/* <Route path="/sign-in" element={<SignInPage />} /> */}
        {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
