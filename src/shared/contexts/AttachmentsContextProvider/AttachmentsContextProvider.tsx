import React, { useState } from "react";

import { AttachmentsContext } from "./AttachmentsContext";
import { IAttachmentsContextProviderProps } from "./AttachmentsContextProvider.interface";

export const AttachmentsContextProvider: React.FC<
	IAttachmentsContextProviderProps
> = ({ children }) => {
	const [attachments, setAttachments] = useState<File[]>([]);

	const clearAttachments = () => {
		setAttachments([]);
	};

	const addAttachments = (files: File[]) => {
		setAttachments(state => [...state, ...files]);
	};

	const deleteAttachment = (index: number) => {
		setAttachments(state => [...state.slice(0, index), ...state.slice(index + 1)]);
	};

	return (
		<AttachmentsContext.Provider
			value={{
				attachments,
				setAttachments,
				clearAttachments,
				addAttachments,
				deleteAttachment
			}}
		>
			{children}
		</AttachmentsContext.Provider>
	);
};
