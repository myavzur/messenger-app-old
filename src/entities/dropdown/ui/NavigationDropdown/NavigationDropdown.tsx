import React from "react";

import { useLogout } from "@/entities/user/lib/hooks";

import { useStoreDispatch, useTheme } from "@/shared/lib/hooks";
import { settingsActions } from "@/shared/models/settings";
import { Icon, MenuItem } from "@/shared/ui";

import { Dropdown } from "../Dropdown";

import { INavigationDropdownProps } from "./NavigationDropdown.interface";

export const NavigationDropdown: React.FC<INavigationDropdownProps> = ({
	...dropdownProps
}) => {
	const dispatch = useStoreDispatch();
	const logout = useLogout();
	const { theme, toggleTheme } = useTheme();
	const themeName = theme[0].toUpperCase() + theme.slice(1);

	const handleOpenProfile = () => {
		dispatch(
			settingsActions.setSidebarsContent({
				leftSidebarView: "profile"
			})
		);
	};

	const handleOpenPreferences = () => {
		dispatch(
			settingsActions.setSidebarsContent({
				leftSidebarView: "preferences"
			})
		);
	};

	return (
		<Dropdown {...dropdownProps}>
			<MenuItem
				label="Profile"
				iconElement={<Icon name="user-gear" />}
				onClick={handleOpenProfile}
			/>
			<MenuItem
				label="Preferences"
				iconElement={<Icon name="brush" />}
				onClick={handleOpenPreferences}
			/>
			<MenuItem
				label={`Theme: ${themeName}`}
				iconElement={<Icon name="brush" />}
				onClick={toggleTheme}
			/>
			<MenuItem
				label="Invisible Mode"
				iconElement={<Icon name="user-ninja" />}
				onClick={() => alert("Sex")}
				isDisabled={true}
			/>
			<MenuItem
				label="Logout"
				iconElement={<Icon name="door-out" />}
				onClick={logout}
				isDangerous={true}
			/>
		</Dropdown>
	);
};
