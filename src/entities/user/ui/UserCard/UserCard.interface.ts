import { IUser } from "@/shared/interfaces/user.interface";

export interface IUserCardProps {
	user: IUser;
	onClick?: (user: IUser) => void;
}
