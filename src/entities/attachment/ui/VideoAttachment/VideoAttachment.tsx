import React from "react";

import { AttachmentTag, IAttachmentProps } from "../../interfaces";

import styles from "./VideoAttachment.module.scss";

const UPLOADS_SERVER_URL = import.meta.env.VITE_UPLOADS_SERVER_URL;

export const VideoAttachment: React.FC<IAttachmentProps> = ({ attachment }) => {
	if (
		attachment.tag !== AttachmentTag.MEDIA &&
		!attachment.file_type.startsWith("video/")
	) {
		console.warn(
			`[VideoAttachment]: Wrong file type or tag. File type: ${attachment.file_type}, Tag: ${attachment.tag}`
		);
		return null;
	}

	return (
		<div className={styles.video}>
			<video
				src={UPLOADS_SERVER_URL + attachment.file_url}
				controls={true}
			/>
		</div>
	);
};
