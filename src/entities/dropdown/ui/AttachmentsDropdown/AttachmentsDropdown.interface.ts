import { IDropdownProps } from "../Dropdown";

export interface IAttachmentsDropdownProps extends Omit<IDropdownProps, "children"> {
	handleFileSizeError?: () => void;
	handleFileTypeError?: () => void;
	handleSuccess?: (files: FileList) => void;
}
