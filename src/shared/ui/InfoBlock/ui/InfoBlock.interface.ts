import { UserStatus } from "@/entities/user/interfaces";

export interface IInfoBlockProps {
	status?: UserStatus;
	imageUrl?: string;
	title: string;
	subtitle?: string | (() => string | undefined);
	onClick?: (e: any) => void;
}
