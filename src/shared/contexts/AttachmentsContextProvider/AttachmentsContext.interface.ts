export interface IAttachmentsContext {
	attachments: File[];
	setAttachments: (files: File[]) => void;
	clearAttachments: () => void;
	addAttachments: (files: File[]) => void;
	deleteAttachment: (index: number) => void;
}
