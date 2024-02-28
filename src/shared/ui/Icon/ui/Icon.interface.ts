export interface IIconProps {
	name: IIconName;
	className?: string;
	/** transform: rotate(180deg) */
	isMirrored?: boolean;
	width?: string;
	height?: string;
	onClick?: () => void;
}

export type IIconName =
	| "appendix"
	| "arrow-right"
	| "attach"
	| "brush"
	| "check"
	| "close"
	| "copy"
	| "door-out"
	| "edit"
	| "eye"
	| "eye-crossed"
	| "file"
	| "generate"
	| "image"
	| "menu-dots"
	| "mention"
	| "moon-stars"
	| "phone"
	| "pin"
	| "reply"
	| "search-eye"
	| "trash-bin"
	| "user-gear"
	| "user-ninja"
	| "verified";
