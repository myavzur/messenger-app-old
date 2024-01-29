import React from "react";

import { Icon, Menu, MenuItem } from "@/shared/ui";

import { IAttachmentsDropdownProps } from "./AttachmentsDropdown.interface";

export const AttachmentsDropdown: React.FC<IAttachmentsDropdownProps> = ({
	className
}) => {
	return (
		<Menu className={className}>
			<MenuItem
				iconElement={<Icon name="image" />}
				label="Photo or Video"
			/>
			<MenuItem
				iconElement={<Icon name="file" />}
				label="File"
			/>
		</Menu>
	);
};
