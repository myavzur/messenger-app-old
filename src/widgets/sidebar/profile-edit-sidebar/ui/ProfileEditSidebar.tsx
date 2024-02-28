import React from "react";
import { useForm } from "react-hook-form";

import { AvatarCircle } from "@/entities/attachment/ui";
import { useAuth } from "@/entities/user/lib/hooks";

import { useStoreDispatch } from "@/shared/lib/hooks";
import { settingsActions } from "@/shared/models/settings";
import {
	Button,
	Field,
	FieldLegend,
	Icon,
	PasswordField,
	SectionHeader
} from "@/shared/ui";

import styles from "./ProfileEditSidebar.module.scss";

export const ProfileEditSidebar: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentUser } = useAuth();

	const { register } = useForm({
		defaultValues: {
			account_name: currentUser?.account_name || "",
			email: currentUser?.email || ""
		}
	});

	if (!currentUser) return "NO USER!";

	const handleBackToProfile = () => {
		dispatch(
			settingsActions.setSidebarsContent({
				leftSidebarView: "profile"
			})
		);
	};

	return (
		<div className={styles.sidebar}>
			<SectionHeader>
				<div className="flex items-center">
					<Button
						onClick={handleBackToProfile}
						iconElement={
							<Icon
								name="arrow-right"
								isMirrored={true}
							/>
						}
						title="Return to profile view"
					/>
					<p className="ml-4">Edit Profile</p>
				</div>
			</SectionHeader>

			<div className="p-4">
				<AvatarCircle
					className="mx-auto mt-5 mb-9"
					placeholderSvgText={currentUser.account_name}
					attachment={currentUser.avatar}
					size="xl"
				/>

				<FieldLegend
					legend="Username"
					description="This is your username, people found by it."
					className="mb-5"
				>
					<Field {...register("account_name")} />
				</FieldLegend>

				<FieldLegend
					legend="Email"
					description="Your email."
				>
					<PasswordField {...register("email")} />
				</FieldLegend>
			</div>
		</div>
	);
};
