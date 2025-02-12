import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../../store/auth/login/reducer"

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logoutUser(navigate))
    // localStorage.removeItem("current_property_id")
  }, [dispatch])

  return <></>
}

export default Logout
