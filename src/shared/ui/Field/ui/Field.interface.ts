import { InputHTMLAttributes } from "react";

import { FieldAction } from "../../FieldAction/ui";

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	isInvalid?: boolean;
	children?: ReturnType<typeof FieldAction>;
}
