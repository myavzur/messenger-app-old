import { ISignInBody } from "@/shared/interfaces/user.interface";

export interface ISignInFormProps {
	onSubmit: (credentials: ISignInBody) => void;
	isSubmitting?: boolean;
	className?: string;
}
