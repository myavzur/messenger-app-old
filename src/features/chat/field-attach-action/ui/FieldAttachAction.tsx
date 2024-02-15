import React, { useRef } from "react";

import { AttachmentsDropdown } from "@/entities/dropdown/ui";

import { useClickOutside } from "@/shared/lib/hooks";
import { FieldAction, Icon } from "@/shared/ui";

import { IFieldAttachActionProps } from "./FieldAttachAction.interface";

import styles from "./FieldAttachAction.module.scss";

const DROPDOWN_DELAY_MS = 300;

export const FieldAttachAction: React.FC<IFieldAttachActionProps> = () => {
	const [fieldActionRef, isDropdownVisible, setDropdownVisible] =
		useClickOutside<HTMLDivElement>();

	const openTimeoutId = useRef<ReturnType<typeof setTimeout>>();
	const closeTimeoutId = useRef<ReturnType<typeof setTimeout>>();

	const handleOpenDropdown = () => {
		clearTimeout(openTimeoutId.current);

		openTimeoutId.current = setTimeout(() => {
			setDropdownVisible(true);
		}, DROPDOWN_DELAY_MS);
	};

	const handleCloseDropdown = () => {
		clearTimeout(closeTimeoutId.current);

		closeTimeoutId.current = setTimeout(() => {
			setDropdownVisible(false);
		}, DROPDOWN_DELAY_MS);
	};

	return (
		<FieldAction
			ref={fieldActionRef}
			iconElement={<Icon name="attach" />}
			wrapperProps={{
				onMouseEnter: handleOpenDropdown,
				onTouchStart: handleOpenDropdown,
				onMouseLeave: handleCloseDropdown
			}}
		>
			{isDropdownVisible && (
				<>
					<AttachmentsDropdown
						containerElementRef={fieldActionRef}
						position="top-end"
					/>
					<div className={styles.backdrop} />
				</>
			)}
		</FieldAction>
	);
};
