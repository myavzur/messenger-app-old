export enum UserStatus {
	OFFLINE,
	ONLINE
}

export enum UserRole {
	USER = "user",
	ADMIN = "admin",
	SERVICE_BOT = "service_bot"
}

export interface IUser {
	id: string;
	created_at: Date;
	last_seen_at: Date;

	account_name: string;
	email: string;
	avatar_url?: string;

	role: UserRole;
}
