import { ReactNode } from "react";

export interface IMultipleSelectFieldProps {
	selectedOptions: IOption[];
	options: IOption[];
	onSelectOption?: (option: IOption) => void;
	onDeleteOption?: (option: IOption) => void;
	setSearchValue?: (value: string) => void;
	optionElement?: ReactNode;
}

interface IOption {
	value: string;
	label: string;
	image_url?: string;
}
