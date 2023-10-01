import { ReactNode } from "react";

import { ISelectFieldOption } from "@/shared/interfaces/select-field-option.interface";

export interface IMultipleSelectFieldProps {
	value: string;
	setValue: (value: string) => void;
	selectedOptions: ISelectFieldOption[];
	renderSelectedOption: (option: ISelectFieldOption) => ReactNode;
	options?: ISelectFieldOption[];
	renderOption: (option: ISelectFieldOption) => ReactNode;
}
