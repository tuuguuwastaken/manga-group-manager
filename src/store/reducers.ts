import { combineReducers } from "redux"
import loginReducer from "./auth/login/reducer"
import registerReducer from "./auth/register/reducer"
import profileReducer from "./profile/reducer"

const rootReducer = combineReducers({
    authLogin: loginReducer,
    authRegister: registerReducer,
    profile: profileReducer,
})

export default rootReducer
