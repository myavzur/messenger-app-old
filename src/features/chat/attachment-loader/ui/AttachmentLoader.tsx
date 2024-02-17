import React from "react";

import { useUploadFile } from "@/shared/lib/hooks";

import { IAttachmentLoaderProps } from "./AttachmentLoader.interface";

export const AttachmentLoader: React.FC<IAttachmentLoaderProps> = ({
	file,
	url,
	onLoadEnded
}) => {
	const [state] = useUploadFile({
		file,
		url,
		onLoadEnded,
		uploadOnMount: true
	});

	return (
		<div>
			<div>
				<img
					src={URL.createObjectURL(file)}
					style={{ objectFit: "cover", width: "100%", height: "100%" }}
				/>
			</div>
			<p>{state.progress === 100 ? "Loaded" : state.progress + "%"}</p>
		</div>
	);
};
