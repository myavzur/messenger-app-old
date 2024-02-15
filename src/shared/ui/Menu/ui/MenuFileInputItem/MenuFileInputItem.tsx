import React from "react";

import { MenuItem } from "../MenuItem";

import { IMenuFileInputItemProps } from "./MenuFileInputItem.interface";

import styles from "./MenuFileInputItem.module.scss";

export const MenuFileInputItem: React.FC<IMenuFileInputItemProps> = ({
	onChange,
	allowedFileTypes = [],
	...menuItemProps
}) => {
	const accept = allowedFileTypes.length > 0 ? allowedFileTypes.join(", ") : "*";

	return (
		<label className={styles.wrapper}>
			<MenuItem {...menuItemProps} />

			<input
				className={styles.input}
				type="file"
				accept={accept}
				multiple={true}
				onChange={onChange}
			/>
		</label>
	);
};
