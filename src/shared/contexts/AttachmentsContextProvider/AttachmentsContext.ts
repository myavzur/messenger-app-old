import React from "react";

import { IAttachmentsContext } from "./AttachmentsContext.interface";

export const AttachmentsContext = React.createContext<IAttachmentsContext>({
	attachments: [],
	setAttachments: () => {
		return;
	},
	clearAttachments: () => {
		return;
	},
	addAttachments: () => {
		return;
	},
	deleteAttachment: () => {
		return;
	}
});
