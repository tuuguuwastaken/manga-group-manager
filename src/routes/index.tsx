// import { Navigate } from "react-router-dom"
import { ReactElement } from "react"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/auth/login"
import Register from "../pages/auth/register"
import Logout from "../pages/auth/logout"
import WorkerListPage from "../pages/employee/workers"
import SupervisorListPage from "../pages/employee/supervisors"
import WorkerCreatePage from "../pages/employee/workers/edit"
import SupervisorCreatePage from "../pages/employee/supervisors/edit"
import WorkplaceListPage from "../pages/workplace"
import PalletCreatePage from "../pages/pallets/edit"
import PalletWeightListPage from "../pages/pallets"
import ContractorListPage from "../pages/contractors"

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
    path: "/dashboard",
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
    component: <WorkerCreatePage />,
    authProtected: true,
  },
  {
    path: "/workers/:id/edit",
    component: <WorkerCreatePage />,
    authProtected: true,
  },
  {
    path: "/supervisors",
    component: <SupervisorListPage />,
    authProtected: true,
  },
  {
    path: "/supervisors/add",
    component: <SupervisorCreatePage />,
    authProtected: true,
  },
  {
    path: "/supervisors/:id/edit",
    component: <SupervisorCreatePage />,
    authProtected: true,
  },
  {
    path: "/workplace/companies",
    component: <WorkplaceListPage />,
    authProtected: true,
  },
  {
    path: "/pallets",
    component: <PalletWeightListPage />,
    authProtected: true,
  },
  {
    path: "/pallets/create",
    component: <PalletCreatePage />,
    authProtected: true,
  },
  {
    path: "/pallets/:id/edit",
    component: <PalletCreatePage />,
    authProtected: true,
  },
  {
    path: "/contractors",
    component: <ContractorListPage />,
    authProtected: true,
  },
]

export default routes
