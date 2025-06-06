import { LoginState } from "./auth/login/reducer";
import { RegisterState } from "./auth/register/reducer";
import { ConctractorEditOneState } from "./contractor/EditOne/reducer";
import { ConctractorGetListState } from "./contractor/GetList/reducer";
import { ContractorGetOneState } from "./contractor/GetOne/reducer";
import { SupervisorEditOneState } from "./Employee/Supervisor/editOne/reducer";
import { SupervisorGetListState } from "./Employee/Supervisor/getList/reducer";
import { SupervisorGetOneState } from "./Employee/Supervisor/getOne/reducer";
import { WorkerEditOneState } from "./Employee/Worker/editOne/reducer";
import { WorkerGetListState } from "./Employee/Worker/getList/reducer";
import { WorkerGetOneState } from "./Employee/Worker/getOne/reducer";
import { WorkerUpdateOneState } from "./Employee/Worker/updateOne/reducer";
import { formEditState } from "./formState/reducer";
import { OrganizationOneState } from "./organization/GetOne/reducer";
import { PalletWeightEditOneState } from "./pallets/editOne/reducer";
import { PalletWeightGetListState } from "./pallets/getList/reducer";
import { PalletWeightGetOneState } from "./pallets/getOne/reducer";
import { ProfileState } from "./profile/reducer";

export interface RootState {
    authLogin: LoginState,
    authRegister: RegisterState,
    profile: ProfileState,
    organizationOne: OrganizationOneState,
    workerEditOne: WorkerEditOneState,
    workerGetList: WorkerGetListState,
    workerGetOne: WorkerGetOneState,
    workerUpdateOne: WorkerUpdateOneState,
    supervisorEditOne: SupervisorEditOneState,
    supervisorGetOne: SupervisorGetOneState,
    supervisorGetList: SupervisorGetListState,
    formEdit: formEditState,
    palletWeightGetList: PalletWeightGetListState,
    palletWeightEditOne: PalletWeightEditOneState,
    palletWeightGetOne: PalletWeightGetOneState,
    contractorGetList: ConctractorGetListState,
    contractorEditOne: ConctractorEditOneState,
    contractorGetOne: ContractorGetOneState,
}