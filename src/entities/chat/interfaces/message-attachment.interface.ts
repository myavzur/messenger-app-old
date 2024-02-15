export enum AttachmentDisplay {
	MEDIA = "media",
	FILE = "file",
	VOICE = "voice"
}

export interface IMessageAttachment {
	id: number;
	created_at: Date;
	display: AttachmentDisplay;
	file_url: string;
	file_name: string;
	file_size: number;
	file_type: string;
}
