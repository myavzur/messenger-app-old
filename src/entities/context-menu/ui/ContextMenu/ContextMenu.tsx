import React, { useLayoutEffect } from "react";

import { useClickOutside } from "@/shared/lib/hooks";
import { Menu } from "@/shared/ui";

import { IContextMenuProps } from "./ContextMenu.interface";

export const ContextMenu: React.FC<IContextMenuProps> = ({
	children,
	mousePosition,
	containerElementRef,
	onClose
}) => {
	const [contextMenuElementRef] = useClickOutside<HTMLDivElement>({
		onUnmount: onClose
	});

	useLayoutEffect(() => {
		const containerEl = containerElementRef?.current;
		const contextMenuEl = contextMenuElementRef?.current;
		if (!containerEl || !contextMenuEl) return;

		const containerRect = containerEl.getBoundingClientRect();
		const contextMenuRect = contextMenuEl.getBoundingClientRect();

		// Get mouse positions inside of container.
		const mouseX = mousePosition.x - containerRect.left;
		const mouseY = mousePosition.y - containerRect.top;

		const freeFromRightPx = Math.round(
			containerRect.width - contextMenuRect.width - mouseX
		);
		const freeFromBottomPx = Math.round(
			containerRect.height - contextMenuRect.height - mouseY
		);

		let transform = "";
		if (freeFromRightPx <= 0) transform += "translateX(-100%) "; // ContextMenu to the left of the cursor.
		if (freeFromBottomPx <= 0) transform += "translateY(-100%)"; // ContextMenu above the cursor.

		contextMenuEl.style.position = "absolute";
		contextMenuEl.style.left = `${mouseX}px`;
		contextMenuEl.style.top = `${mouseY + containerEl.scrollTop}px`;
		contextMenuEl.style.transform = transform;

		containerEl.style.overflowY = "hidden";
		return () => {
			containerEl.style.overflowY = "auto";
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Menu ref={contextMenuElementRef}>{children}</Menu>;
};
