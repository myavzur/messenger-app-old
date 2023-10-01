import { IUser } from "@/shared/interfaces/user.interface";

export interface IUserBadgeProps extends Pick<IUser, "account_name" | "avatar_url"> {
	className?: string;
	onClick?: () => void;
}
