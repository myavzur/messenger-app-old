import React from "react";

import { useStoreDispatch } from "@/shared/lib/hooks";
import { settingsActions } from "@/shared/models/settings";
import { Button, Icon, SectionHeader } from "@/shared/ui";

import styles from "./PreferencesSidebar.module.scss";

export const PreferencesSidebar: React.FC = () => {
	const dispatch = useStoreDispatch();

	const handleBackToChats = () => {
		dispatch(
			settingsActions.setSidebarsContent({
				leftSidebarView: "chats"
			})
		);
	};

	return (
		<div className={styles.sidebar}>
			<SectionHeader>
				<div className="flex items-center">
					<Button
						onClick={handleBackToChats}
						iconElement={
							<Icon
								name="arrow-right"
								isMirrored={true}
							/>
						}
						title="Return to chats"
					/>
					<p className="ml-4">Preferences</p>
				</div>
			</SectionHeader>

			<div className="p-4">Theme!</div>
		</div>
	);
};
