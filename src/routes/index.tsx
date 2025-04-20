// import { Navigate } from "react-router-dom"
import { ReactElement } from "react"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/auth/login"
import Register from "../pages/auth/register"
import Logout from "../pages/auth/logout"
import WorkerListPage from "../pages/employee/workers"
import SupervisorListPage from "../pages/employee/supervisors"
import WorkerCreatePage from "../pages/employee/workers/edit"

interface RouterType {
  path: string
  component: ReactElement
  exact?: boolean
  authProtected: boolean
}

const routes: RouterType[] = [
  {
    path: "/",
    component: <Dashboard />,
    authProtected: true,
  },
  {
    path: "/login",
    component: <Login />,
    authProtected: false,
  },
  {
    path: "/logout",
    component: <Logout />,
    authProtected: false,
  },
  {
    path: "/register",
    component: <Register />,
    authProtected: false,
  },
  {
    path: "/workers",
    component: <WorkerListPage />,
    authProtected: true,
  },
  {
    path: "/workers/add",
    component: <WorkerCreatePage/>,
    authProtected: true,
  },
  {
    path:"/workers/:id/edit",
    component: <WorkerCreatePage />,
    authProtected: true,
  },
  {
    path: "/supervisors",
    component: <SupervisorListPage />,
    authProtected: true,
  },
]

export default routes
