import { IUser } from "@/shared/interfaces/user.interface";

export interface IUserInfoBlockProps {
	user: IUser;
	onClick?: (user: IUser) => void;
}
