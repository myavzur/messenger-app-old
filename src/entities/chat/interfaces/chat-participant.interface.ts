import { IUser } from "@/entities/user/interfaces";

export enum ChatParticipantRole {
	PARTICIPANT = "participant",
	ADMIN = "admin",
	OWNER = "owner"
}

export interface IChatParticipant {
	role: ChatParticipantRole;
	user: IUser;
}
