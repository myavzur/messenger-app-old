import React from "react";

import { MainLayout } from "@/layouts";

import { Content } from "./ui/Content";
import { Sidebar } from "./ui/Sidebar";

const Chats: React.FC = () => {
	return (
		<MainLayout
			asideContent={<Sidebar />}
			mainContent={<Content />}
		/>
	);
};

export default Chats;
