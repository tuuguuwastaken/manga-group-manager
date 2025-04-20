import { combineReducers } from "redux"
import loginReducer from "./auth/login/reducer"
import registerReducer from "./auth/register/reducer"
import profileReducer from "./profile/reducer"
import organizationOneReducer from "./organization/GetOne/reducer"
import workerEditOneReducer from "./Employee/Worker/editOne/reducer"
import workerGetListReducer from "./Employee/Worker/getList/reducer"
import workerGetOneReducer from "./Employee/Worker/getOne/reducer"
import workerUpdateOneReducer from "./Employee/Worker/updateOne/reducer"
import supervisorEditOneReducer from "./Employee/Supervisor/editOne/reducer"
import supervisorGetOneReducer from "./Employee/Supervisor/getOne/reducer"
import supervisorGetListReducer from "./Employee/Supervisor/getList/reducer"

const rootReducer = combineReducers({
    authLogin: loginReducer,
    authRegister: registerReducer,
    profile: profileReducer,
    organizationOne: organizationOneReducer,
    workerEditOne: workerEditOneReducer,
    workerGetList: workerGetListReducer,
    workerGetOne: workerGetOneReducer,
    workerUpdateOne: workerUpdateOneReducer,
    supervisorEditOne: supervisorEditOneReducer,
    supervisorGetOne: supervisorGetOneReducer,
    supervisorGetList: supervisorGetListReducer,
})

export default rootReducer
