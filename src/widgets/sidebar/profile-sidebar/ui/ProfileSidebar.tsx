import React from "react";

import { MetaInfoRow } from "@/features/meta-info-row/ui";
import { Slider } from "@/features/slider/ui";

import { baseApi } from "@/shared/api";
import { useStoreDispatch } from "@/shared/lib/hooks";
import { settingsActions } from "@/shared/models/settings";
import { Button, Icon, SectionHeader } from "@/shared/ui";

import { IProfileSidebarProps } from "./ProfileSidebar.interface";

import styles from "./ProfileSidebar.module.scss";

export const ProfileSidebar: React.FC<IProfileSidebarProps> = ({ user }) => {
	const dispatch = useStoreDispatch();
	const { data: avatars, isLoading: isAvatarsLoading } =
		baseApi.useGetUserAvatarsQuery(user.id);

	const handleBackToChatList = () => {
		dispatch(
			settingsActions.setSidebarsContent({
				leftSidebarView: "chats"
			})
		);
	};

	const handleOpenProfileEdit = () => {
		dispatch(
			settingsActions.setSidebarsContent({
				leftSidebarView: "profile/edit"
			})
		);
	};

	return (
		<div className={styles.sidebar}>
			<SectionHeader>
				<div className="flex items-center">
					<Button
						onClick={handleBackToChatList}
						iconElement={
							<Icon
								name="arrow-right"
								isMirrored={true}
							/>
						}
						title="Return to chats"
					/>
					<p className="ml-4">Profile</p>
				</div>

				<Button
					onClick={handleOpenProfileEdit}
					iconElement={<Icon name="edit" />}
				/>
			</SectionHeader>

			{!isAvatarsLoading && avatars && (
				<Slider
					attachments={avatars}
					emptyPicturesText={user.account_name}
				/>
			)}

			<div className={styles.meta}>
				<MetaInfoRow
					className={styles.meta__row}
					iconName="mention"
					subtitle="Username"
					value={user.account_name}
				/>
			</div>
		</div>
	);
};
