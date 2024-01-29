import React, { useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { useClickOutside } from "@/shared/lib/hooks";

import { IModalProps } from "./Modal.interface";

import styles from "./Modal.module.scss";

const MODALS_CONTAINER_ID = "modals-container";

export const Modal: React.FC<IModalProps> = ({
	onClose,
	headerElement,
	children,
	footerElement
}) => {
	const modalsContainerElRef = useRef<HTMLElement>();
	const [modalRef] = useClickOutside({ onUnmount: onClose });

	useLayoutEffect(() => {
		let modalsContainerEl = document.getElementById(MODALS_CONTAINER_ID);

		// If container exists - use it
		if (modalsContainerEl) {
			modalsContainerElRef.current = modalsContainerEl;
			return;
		}

		modalsContainerEl = document.createElement("div");
		modalsContainerEl.id = MODALS_CONTAINER_ID;

		document.body.append(modalsContainerEl);
		modalsContainerElRef.current = modalsContainerEl;
	}, []);

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	const modalContent = (
		<div className={styles.modal}>
			<div
				className={styles.modal__dialog}
				ref={modalRef}
			>
				{headerElement && (
					<div className={styles.modal__header}>{headerElement}</div>
				)}

				<div className={styles.modal__content}>{children}</div>

				{footerElement && (
					<div className={styles.modal__footer}>{footerElement}</div>
				)}
			</div>
		</div>
	);

	return ReactDOM.createPortal(modalContent, document.body);
};
