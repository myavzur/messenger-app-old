import { UploadFileUrl } from "@/shared/lib/hooks";

export interface IAttachmentLoaderProps {
	file: File;
	url: UploadFileUrl;
	onLoadEnded: (data: any) => void;
}
