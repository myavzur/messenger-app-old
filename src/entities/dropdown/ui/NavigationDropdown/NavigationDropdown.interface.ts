import { IDropdownProps } from "../Dropdown";

export interface INavigationDropdownProps extends Omit<IDropdownProps, "children"> {
	className?: string;
}
