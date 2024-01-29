export interface IIconProps {
	name:
		| "eye"
		| "eye-crossed"
		| "double-arrow"
		| "search-eye"
		| "close"
		| "generate"
		| "phone"
		| "attach"
		| "pin"
		| "verified"
		| "check"
		| "door-out"
		| "appendix"
		| "reply"
		| "edit"
		| "copy"
		| "image"
		| "file"
		| "trash-bin";
	className?: string;
	width?: string;
	height?: string;
	onClick?: () => void;
}
