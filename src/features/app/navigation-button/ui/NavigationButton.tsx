import React from "react";

import { NavigationDropdown } from "@/entities/dropdown/ui";

import { useClickOutside } from "@/shared/lib/hooks";
import { Button, Icon } from "@/shared/ui";

export const NavigationButton: React.FC = () => {
	const [navigationRef, isDropdownVisible, setDropdownVisible] =
		useClickOutside<HTMLDivElement>();

	return (
		<div
			ref={navigationRef}
			className="relative"
		>
			<Button
				iconElement={<Icon name="menu-dots" />}
				onClick={() => setDropdownVisible(true)}
			/>

			{isDropdownVisible && (
				<NavigationDropdown
					containerElementRef={navigationRef}
					position="bottom-start"
				/>
			)}
		</div>
	);
};
