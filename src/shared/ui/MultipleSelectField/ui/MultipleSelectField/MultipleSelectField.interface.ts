import { IOption } from "../../interfaces/option.interface";

export interface IMultipleSelectFieldProps {
	searchTerm?: string;
	setSearchTerm?: (searchTerm: string) => void;
	isLoadingOptions?: boolean;
	options?: IOption[];
	/** Triggers on option selected or deleted from select */
	onUpdate?: (selectedOptions: IOption[]) => void;
}
