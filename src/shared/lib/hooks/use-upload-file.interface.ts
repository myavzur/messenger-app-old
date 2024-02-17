import { AttachmentTag } from "@/entities/attachment/interfaces";

export type UploadFileUrl =
	| "/upload/avatar"
	| `/upload/m-attachment?tag=${Exclude<AttachmentTag, AttachmentTag.AVATAR>}`;

export interface IUseUploadFileParams {
	file?: File;
	url: UploadFileUrl;
	uploadOnMount?: boolean;
	onLoadEnded?: (data: any) => void;
}

export interface IUseUploadFileState<ResponseType extends object> {
	data: ResponseType | null;
	progress: number;
	status: "idle" | "loading" | "success" | "error";
	errorText: string | null;
}

export type IUseUploadFileResult<ResponseType extends object> = [
	state: IUseUploadFileState<ResponseType>,
	upload: (file: File, url: UploadFileUrl) => Promise<any>,
	abort: () => void
];
