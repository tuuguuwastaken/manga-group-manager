import { LoginState } from "./auth/login/reducer";
import { RegisterState } from "./auth/register/reducer";

export interface RootState {
    authLogin: LoginState,
    authRegister: RegisterState,
}