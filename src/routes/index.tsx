// import { Navigate } from "react-router-dom"
import { ReactElement } from "react"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/auth/login"
import Register from "../pages/auth/register"
import Logout from "../pages/auth/logout"

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
    path:"/logout",
    component: <Logout />,
    authProtected: false
  },
  {
    path:"/register",
    component: <Register />,
    authProtected: false,
  }
]

export default routes
