import React from "react";

import { AttachmentTag, IAttachment } from "@/entities/attachment/interfaces";
import {
	FileAttachment,
	ImageAttachment,
	VideoAttachment
} from "@/entities/attachment/ui";

import { IMessageAttachmentsProps } from "./MessageAttachments.interface";

import styles from "./MessageAttachments.module.scss";

export const MessageAttachments: React.FC<IMessageAttachmentsProps> = ({
	attachments
}) => {
	const renderAttachment = (attachment: IAttachment) => {
		const isMediaTag = attachment.tag === AttachmentTag.MEDIA;

		if (isMediaTag && attachment.file_type.startsWith("image/")) {
			return <ImageAttachment attachment={attachment} />;
		}
		if (isMediaTag && attachment.file_type.startsWith("video/")) {
			return <VideoAttachment attachment={attachment} />;
		}

		return <FileAttachment attachment={attachment} />;
	};

	return (
		<div className={styles.attachments}>
			{attachments.map(attachment => (
				<div key={attachment.id}>{renderAttachment(attachment)}</div>
			))}
		</div>
	);
};
