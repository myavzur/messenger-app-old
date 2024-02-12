import { ChangeEventHandler } from "react";

import { IMenuItemProps } from "../MenuItem";

export interface IMenuFileInputItemProps extends IMenuItemProps {
	/** Allowed mime-types for files */
	allowedFileTypes?: string[];
	/** Max file size in Bytes. */
	onChange: ChangeEventHandler<HTMLInputElement>;
}
