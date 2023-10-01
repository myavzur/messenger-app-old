export interface IUser {
	id: number;
	created_at: Date;
	avatar_url?: string;
	email: string;
	account_name: string;
	status?: 0 | 1;
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
