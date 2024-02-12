import { InputHTMLAttributes } from "react";

export interface ITextAreaFieldProps
	extends InputHTMLAttributes<HTMLTextAreaElement> {
	isInvalid?: boolean;
	maxGrowHeight?: number;
	maxTextLength?: number;
	preventBorderTop?: boolean;
	onEnterKeyPress?: () => void;
	children?: React.ReactNode;
}
