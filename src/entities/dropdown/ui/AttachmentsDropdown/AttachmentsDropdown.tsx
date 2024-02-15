import React, { ChangeEventHandler } from "react";

import { Icon, MenuFileInputItem } from "@/shared/ui";

import { Dropdown } from "../Dropdown";

import { IAttachmentsDropdownProps } from "./AttachmentsDropdown.interface";

const MIMES = {
	png: "image/png",
	jpg: "image/jpeg", // .jfif, .pjp
	gif: "image/gif",
	mp4: "video/mp4",
	m4v: "video/x-m4v",
	mov: "video/quicktime"
};

const mediaFileTypes = [
	MIMES.png,
	MIMES.jpg,
	MIMES.gif,
	MIMES.mp4,
	MIMES.m4v,
	MIMES.mov
];

export const AttachmentsDropdown: React.FC<IAttachmentsDropdownProps> = ({
	...dropdownProps
}) => {
	const handleAttachMediaFile: ChangeEventHandler<HTMLInputElement> = e => {
		const files = e.target.files;
		if (!files) return;
	};

	const handleAttachAnyFile: ChangeEventHandler<HTMLInputElement> = e => {
		console.log(e.target.files);
	};

	// TODO: Fix inputs. Prepare back-end
	return (
		<Dropdown {...dropdownProps}>
			<MenuFileInputItem
				iconElement={<Icon name="image" />}
				label="Photo or Video"
				onChange={handleAttachMediaFile}
				allowedFileTypes={mediaFileTypes}
			/>
			<MenuFileInputItem
				iconElement={<Icon name="file" />}
				label="File"
				onChange={handleAttachAnyFile}
			/>
		</Dropdown>
	);
};
