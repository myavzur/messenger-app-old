import { IBase } from "./base.interface";

export interface IUser extends IBase {
	created_at: Date;
	email: string;
	account_name: string;
	first_name?: string;
	last_name?: string;
}

// API
export interface ISignInBody extends Pick<IUser, "email"> {
	password: string;
}

export interface ISignUpBody extends ISignInBody {
	account_name?: string;
	password_confirmation: string;
}

export interface IAuthResponse {
	user: IUser;
	access_token: string;
}
