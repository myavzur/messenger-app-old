import { IOption } from "../../interfaces/option.interface";

export interface IOptionProps extends IOption {
	className?: string;
	onClick?: () => void;
}
