import { ISignUpBody } from "@/entities/user/interfaces";

export interface ISignUpFormProps {
	onSubmit: (credentials: ISignUpBody) => void;
	isSubmitting?: boolean;
	className?: string;
}
