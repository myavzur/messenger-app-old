export interface ISelectUserOption {
	value: string;
	label: string;
	image_url: string;
}

export interface ISelectUsersFieldProps {
	isFetching?: boolean;
	isLoading?: boolean;
	placeholder?: string;
	onChange?: (options: ISelectUserOption[]) => void;
	onSearch?: (value: string) => void;
	options?: ISelectUserOption[];
	renderOption: (option: ISelectUserOption) => JSX.Element;
}
