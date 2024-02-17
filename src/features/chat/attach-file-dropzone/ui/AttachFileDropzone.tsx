import React from "react";

import { useAttachmentsContext } from "@/shared/lib/hooks";
import { Dropzone, Icon } from "@/shared/ui";

export const AttachFileDropzone: React.FC = () => {
	const { addAttachments } = useAttachmentsContext();

	const handleDrop = (files: File[]) => {
		addAttachments(files);
	};

	return (
		<Dropzone
			iconElement={<Icon name="file" />}
			caption="without compression"
			onDrop={handleDrop}
		/>
	);
};
