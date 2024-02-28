import { IAttachment } from "@/entities/attachment/interfaces";
import { UserStatus } from "@/entities/user/interfaces";

export interface IInfoBlockProps {
	status?: UserStatus;
	image?: IAttachment;
	title: string;
	subtitle?: string | (() => string | undefined);
	onClick?: (e: any) => void;
}
