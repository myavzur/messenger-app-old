import { IUser } from "@/entities/user/interfaces";

export interface IUserInfoBlockProps {
	user: IUser;
	onClick?: (user: IUser) => void;
}
