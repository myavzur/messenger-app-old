import React, { useLayoutEffect, useRef } from "react";

import { Menu } from "@/shared/ui";

import { IDropdownProps } from "./Dropdown.interface";

export const Dropdown: React.FC<IDropdownProps> = ({
	containerElementRef,
	spacingFromContainerPx = 5,
	position = "top-end",
	onMouseOut,
	children
}) => {
	const dropdownElementRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const containerEl = containerElementRef.current;
		const dropdownEl = dropdownElementRef.current;
		if (!containerEl || !dropdownEl) return;

		dropdownEl.style.position = "absolute";
		switch (position) {
			case "top-start": {
				console.debug("Not implemented");
				break;
			}
			case "top-end": {
				dropdownEl.style.bottom = `calc(100% + ${spacingFromContainerPx}px)`;
				dropdownEl.style.right = "0";
				break;
			}
			case "bottom-start": {
				dropdownEl.style.top = `calc(100% + ${spacingFromContainerPx}px)`;
				dropdownEl.style.left = "0";
				break;
			}
			case "bottom-end": {
				console.debug("Not implemented");
				break;
			}
			default: {
				console.debug(`Not implemented: ${position}`);
				break;
			}
		}

		// Должно отрабатывать только на первый рендер для позиционирования дроп-дауна.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Menu
			ref={dropdownElementRef}
			onMouseOut={onMouseOut}
		>
			{children}
		</Menu>
	);
};
