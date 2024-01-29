import { IUser } from "./user.interface";

export interface ISignInBody {
	email: string;
	password: string;
}

export interface ISignUpBody {
	email: string;
	account_name: string;
	password: string;
	password_confirmation: string;
}

export interface IAuthResponse {
	user: IUser;
	access_token: string;
}
