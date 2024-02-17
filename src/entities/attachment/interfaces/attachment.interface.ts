export enum AttachmentTag {
	FILE = "file",
	MEDIA = "media",
	VOICE = "voice",
	CIRCLE = "circle",
	AVATAR = "avatar"
}

export interface IAttachment {
	id: string;
	created_at: Date;
	tag: AttachmentTag;
	file_url: string;
	file_name: string;
	file_size: number;
	file_type: string;
}
