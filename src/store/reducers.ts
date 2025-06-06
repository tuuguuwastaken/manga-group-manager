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
import formEditReducer from "./formState/reducer"
import palletWeightGetListReducer from "./pallets/getList/reducer"
import palletWeightEditOneReducer from "./pallets/editOne/reducer"
import palletWeightGetOneReducer from "./pallets/getOne/reducer"
import contractorGetListReducer from "./contractor/GetList/reducer"
import contractorEditOneReducer from "./contractor/EditOne/reducer"
import contractorGetOneReducer from "./contractor/GetOne/reducer"

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
    formEdit: formEditReducer,
    palletWeightGetList: palletWeightGetListReducer,
    palletWeightEditOne: palletWeightEditOneReducer,
    palletWeightGetOne: palletWeightGetOneReducer,
    contractorGetList: contractorGetListReducer,
    contractorEditOne: contractorEditOneReducer,
    contractorGetOne: contractorGetOneReducer,
})

export default rootReducer
