import React from "react";

import { Icon } from "@/shared/ui";

import { AttachmentTag, IAttachmentProps } from "../../interfaces";

import styles from "./FileAttachment.module.scss";

export const FileAttachment: React.FC<IAttachmentProps> = ({ attachment }) => {
	if (attachment.tag !== AttachmentTag.FILE) {
		console.warn(
			`[FileAttachment]: Wrong file tag. File type: ${attachment.file_type}, Tag: ${attachment.tag}`
		);
		return null;
	}

	return (
		<div className={styles.file}>
			<Icon
				name="file"
				className={styles.file__icon}
			/>
			<span className={styles.file__info}>
				<p className={styles.file__name}>{attachment.file_name}</p>
				<p className={styles.file__size}>{attachment.file_size}</p>
			</span>
		</div>
	);
};
