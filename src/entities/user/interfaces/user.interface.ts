import { IAttachment } from "@/entities/attachment/interfaces";

export enum UserStatus {
	OFFLINE,
	ONLINE
}

export enum UserRole {
	USER = "user",
	ADMIN = "admin",
	SERVICE_BOT = "service_bot"
}

export enum UserTheme {
	SOFT_CORAL = "soft-coral",
	SUNSET_ORANGE = "sunset-orange",
	LAVENDER_PURPLE = "lavender-purple",
	FRESH_LIME = "fresh-lime",
	AQUA_MARINE = "aqua-marine",
	SKY_BLUE = "sky-blue",
	PINK_ORCHID = "pink-orchid"
}

export interface IUser {
	id: string;
	created_at: Date;
	last_seen_at: Date;
	account_name: string;
	email?: string;
	avatar?: IAttachment;
	role: UserRole;
	theme: UserTheme;
}
