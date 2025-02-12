import { LoginState } from "./auth/login/reducer";
import { RegisterState } from "./auth/register/reducer";
import { ProfileState } from "./profile/reducer";

export interface RootState {
    authLogin: LoginState,
    authRegister: RegisterState,
    profile: ProfileState,
}