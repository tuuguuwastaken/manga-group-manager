/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useBlocker } from "react-router-dom"
import { loginUserSet } from "../store/auth/login/reducer"
import firebase from "firebase/compat/app"
import AppLayout from "../components/Layout"
import { formEditFinished, selectFormEditState } from "../store/formState/reducer"
import { Modal } from "antd"

interface AppRouteProps {
  children: ReactNode
  isAuthProtected: boolean
}

const AppRoute: React.FC<AppRouteProps> = ({ children, isAuthProtected }) => {
  const dispatch = useDispatch()
  const formState = useSelector(selectFormEditState)

  useEffect(() => {
    const authUser = localStorage.getItem("authUser")
    if (authUser) {
      dispatch(loginUserSet(JSON.parse(authUser) as firebase.User))
    }
  }, [])

  if (isAuthProtected && !localStorage.getItem("authUser")) {
    return <Navigate to="/login" />
  }

  const blocker = useBlocker(({ currentLocation, nextLocation }) => formState?.isEdit && currentLocation.pathname !== nextLocation.pathname)

  const handleOk = () => {
    if (blocker.reset) {
      blocker.reset()
    }
  }

  const handleCancel = () => {
    dispatch(formEditFinished())
    if (blocker.proceed) {
      blocker.proceed()
    }
  }

  if (isAuthProtected) {
    return (
      <>
        <>
          <AppLayout>
            {children}
            {blocker && blocker.state === "blocked" ? (
              <Modal
                title="Youre still in the process of editing"
                open={true}
                onOk={handleOk}
                closable={false}
                onCancel={handleCancel}
                okText="Continue"
                cancelText="Discard"
              >
                <p>There are unsaved changes, would you like to continue editing?</p>
              </Modal>
            ) : null}
          </AppLayout>
        </>
      </>
    )
  }

  return <>{children}</>
}

export default AppRoute
