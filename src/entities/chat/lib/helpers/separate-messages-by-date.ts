import dayjs from "dayjs";

import { IMessage } from "@/entities/chat/interfaces";

interface IMessagesBlock {
	date: Date;
	messages: IMessage[];
}

export const separateMessagesByDate = (messages: IMessage[]) => {
	const blocks: IMessagesBlock[] = [];

	messages.forEach(message => {
		const block = blocks.find(block => {
			const blockDate = dayjs(block.date).format("YYYY-MM-DD");
			const messageDate = dayjs(message.created_at).format("YYYY-MM-DD");

			return blockDate === messageDate;
		});

		/* If block for {message.created_at} exists - push message to it
		 * Otherwise - create new block with {message.created_at}
		 */
		if (block) {
			block.messages.push(message);
		} else {
			blocks.push({
				date: message.created_at,
				messages: [message]
			});
		}
	});

	console.log(blocks);

	return blocks;
};
