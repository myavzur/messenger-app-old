import React, { ChangeEventHandler } from "react";

import { allowedAttachmentTypes } from "@/shared/constants/allowed-file-types";
import { useAttachmentsContext } from "@/shared/lib/hooks";
import { Icon, MenuFileInputItem } from "@/shared/ui";

import { Dropdown } from "../Dropdown";

import { IAttachmentsDropdownProps } from "./AttachmentsDropdown.interface";

export const AttachmentsDropdown: React.FC<IAttachmentsDropdownProps> = ({
	...dropdownProps
}) => {
	const { addAttachments } = useAttachmentsContext();

	const handleAttachMediaFile: ChangeEventHandler<HTMLInputElement> = e => {
		const files = e.target.files;
		if (!files) return;
		addAttachments(Array.from(files));
	};

	const handleAttachAnyFile: ChangeEventHandler<HTMLInputElement> = e => {
		console.log(e.target.files);
	};

	return (
		<Dropdown {...dropdownProps}>
			<MenuFileInputItem
				iconElement={<Icon name="image" />}
				label="Photo or Video"
				onChange={handleAttachMediaFile}
				allowedFileTypes={allowedAttachmentTypes}
			/>
			<MenuFileInputItem
				iconElement={<Icon name="file" />}
				label="File"
				onChange={handleAttachAnyFile}
			/>
		</Dropdown>
	);
};
