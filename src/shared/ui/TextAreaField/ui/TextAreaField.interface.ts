import { InputHTMLAttributes } from "react";

export interface ITextAreaFieldProps
	extends InputHTMLAttributes<HTMLTextAreaElement> {
	isInvalid?: boolean;
	maxGrowHeight?: number;
	maxTextLength?: number;
	preventBorderTop?: boolean;
	shouldHandleEnterKey?: boolean;
	children?: React.ReactNode;
}
