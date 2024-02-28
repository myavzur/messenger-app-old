import { IAttachment } from "@/entities/attachment/interfaces";
import { UserStatus } from "@/entities/user/interfaces";

import { IChatParticipant } from "./chat-participant.interface";
import { IMessage } from "./message.interface";

export enum ChatType {
	/** Такие чаты не хранятся в базе данных!
	 * Существуют лишь при открытии чата с пользователем,
	 * при условии, что физического чата ещё нет. */
	TEMP = "temp",
	LOCAL = "local",
	GROUP = "group"
}

/** Эти поля существует только на фронте, чтобы обеспечить
 * удобную обработку пользовательских статусов. */
interface IChatClientProperties {
	user_status?: UserStatus;
	user_last_seen_at?: Date;
}

export interface IChat extends IChatClientProperties {
	id: string;
	updated_at: Date;
	title?: string;
	image?: IAttachment;
	type: ChatType;

	messages: IMessage[];
	last_message?: IMessage;

	participants: IChatParticipant[];
	participants_count: number;
}
