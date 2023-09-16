import { ISignUpBody } from "@/shared/interfaces/user.interface";

export interface ISignUpFormProps {
	onSubmit: (credentials: ISignUpBody) => void;
	isSubmitting?: boolean;
	className?: string;
}
