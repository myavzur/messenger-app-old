import { UserStatus } from "@/shared/interfaces/user.interface";

export interface IInfoBlockProps {
	status?: UserStatus;
	imageUrl?: string;
	title: string;
	subtitle?: string;
	onClick?: (e: any) => void;
}
