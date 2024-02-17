import { useContext } from "react";

import { IAttachmentsContext } from "@/shared/contexts/AttachmentsContextProvider";

import { AttachmentsContext } from "../../contexts/AttachmentsContextProvider/AttachmentsContext";

export const useAttachmentsContext = () => {
	const context = useContext(AttachmentsContext) as IAttachmentsContext;

	if (!context) {
		throw new Error(
			"useAttachmentsContext must be used withing AttachmentsContextProvider"
		);
	}

	return context;
};
