interface IDropdownItem {
	icon?: React.ReactNode;
	title: string;
	onClick?: () => void;
	isDangerous?: boolean;
}

export interface IDropdownProps {
	items: IDropdownItem[];
}
