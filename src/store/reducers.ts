import { combineReducers } from "redux"
import loginReducer from "./auth/login/reducer"
import registerReducer from "./auth/register/reducer"

const rootReducer = combineReducers({
    authLogin: loginReducer,
    authRegister: registerReducer,
})

export default rootReducer
