import React, { useEffect } from "react";

import { LogoutButton } from "@/features/logout";

import { IDefaultLayoutProps } from "../interfaces/DefaultLayout.interface";

const ChatsLayout: React.FC<IDefaultLayoutProps> = ({ children }) => {
	return (
		<div>
			<aside>
				<LogoutButton />
			</aside>
			<main></main>
		</div>
	);
};

export default ChatsLayout;
