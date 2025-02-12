import React, { ReactNode, useEffect } from "react";
import AppLayout from "../components/Layout";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUserSet } from "../store/auth/login/reducer";
import firebase from "firebase/compat/app"

interface AppRouteProps {
  children: ReactNode;
  isAuthProtected: boolean;
}

const AppRoute: React.FC<AppRouteProps> = ({ children, isAuthProtected }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const authUser = localStorage.getItem("authUser")
    if (authUser) {
      dispatch(loginUserSet(JSON.parse(authUser) as firebase.User))
    }
  }, [])

  if (isAuthProtected && !localStorage.getItem("authUser")) {
    return <Navigate to="/login" />
  }

  if (isAuthProtected) {
    return (
      <>
        <>
          <AppLayout>{children}</AppLayout>
        </>
      </>
    );
  }

  return <>{children}</>;
};

export default AppRoute;
