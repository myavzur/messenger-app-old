import React, { useState } from "react";

import { AttachmentTag, IAttachmentProps } from "../../interfaces";

import styles from "./ImageAttachment.module.scss";

const UPLOADS_SERVER_URL = import.meta.env.VITE_UPLOADS_SERVER_URL;

export const ImageAttachment: React.FC<IAttachmentProps> = ({ attachment }) => {
	if (
		attachment.tag !== AttachmentTag.MEDIA &&
		!attachment.file_type.startsWith("image/")
	) {
		console.warn(
			`[ImageAttachment]: Wrong file type or tag. File type: ${attachment.tag}, Tag: ${attachment.tag}`
		);
	}

	const [isError, setError] = useState(false);

	return (
		<picture className={styles.image}>
			<img
				className={styles.image__img}
				src={
					isError
						? "https://a.l3n.co/i/Arb2Qq.png"
						: UPLOADS_SERVER_URL + attachment.file_url
				}
				alt={attachment.file_name}
				onError={() => setError(true)}
			/>
		</picture>
	);
};
