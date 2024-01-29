import { ISignInBody } from "@/entities/user/interfaces";

export interface ISignInFormProps {
	onSubmit: (credentials: ISignInBody) => void;
	isSubmitting?: boolean;
	className?: string;
}
