import { ISelectFieldOption } from "@/shared/interfaces/select-field-option.interface";

export interface ISelectMultipleUsersFieldProps {
	value: string;
	setValue: (value: string) => void;
	onChangeSelectedOptions: (options: ISelectFieldOption[]) => void;
}
