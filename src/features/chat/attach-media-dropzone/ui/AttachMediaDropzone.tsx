import React from "react";

import { useAttachmentsContext } from "@/shared/lib/hooks";
import { Dropzone, Icon } from "@/shared/ui";

export const AttachMediaDropzone: React.FC = () => {
	const { addAttachments } = useAttachmentsContext();

	const handleDrop = (files: File[]) => {
		addAttachments(files);
	};

	return (
		<Dropzone
			iconElement={<Icon name="image" />}
			caption="in a quick way"
			onDrop={handleDrop}
		/>
	);
};
