import { IAttachment } from "@/entities/attachment/interfaces";
import { UserStatus } from "@/entities/user/interfaces";

export interface IAvatarCircleProps {
	placeholderSvgText: string;
	attachment?: IAttachment;
	status?: UserStatus;
	size?: "xs" | "sm" | "base" | "xl";
	className?: string;
}
