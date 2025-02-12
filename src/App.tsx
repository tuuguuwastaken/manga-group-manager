import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import routes from "./routes"
import { ConfigProvider } from "antd"
import "dayjs/locale/mn"
import DatePickerLocale from "antd/es/date-picker/locale/mn_MN"
import TimePickerLocale from "antd/es/time-picker/locale/mn_MN"
import { initFirebaseBackend } from "./firebase/helper"
import AppRoute from "./routes/route"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_APPID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
}
initFirebaseBackend(firebaseConfig)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope)
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err)
    })
}

const App = () => {
  const router = createBrowserRouter(
    routes.map((route) => ({
      path: route.path,
      index: route.exact,
      element: <AppRoute isAuthProtected={route.authProtected}>{route.component}</AppRoute>,
    }))
  )

  return (
    <React.Fragment>
      <ConfigProvider
        theme={{ token: { colorPrimary: "#389E0D" } }}
        locale={{
          locale: "mn",
          DatePicker: DatePickerLocale,
          TimePicker: TimePickerLocale,
          Empty: {
            description: "Мэдээлэл хоосон байна",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.Fragment>
  )
}

export default App
