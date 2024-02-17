import cn from "classnames";
import React, { DragEventHandler, useState } from "react";

import { IDropzoneProps } from "./Dropzone.interface";

import styles from "./Dropzone.module.scss";

export const Dropzone: React.FC<IDropzoneProps> = ({
	iconElement,
	label = "Drop files here to send them",
	caption = "in quick way",
	onDrop
}) => {
	const [isDraggingOver, setDraggingOver] = useState(false);

	const handleDragStart: DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault();
		setDraggingOver(true);
	};

	const handleDragLeave: DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault();
		setDraggingOver(false);
	};

	const handleDrop: DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault();
		setDraggingOver(false);

		const files = e.dataTransfer.files;
		if (files.length <= 0) return;

		console.log(
			`%c[Dropzone/handleDrop]: ${files.length} files dropped.`,
			"color: green"
		);

		onDrop(Array.from(files));
	};

	return (
		<div
			className={cn(styles.dropzone, {
				[styles["dropzone_dragging-over"]]: isDraggingOver
			})}
		>
			<div
				className={styles.dropzone__content}
				onDragOver={handleDragStart}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<div className={styles["dropzone__content-icon"]}>{iconElement}</div>
				<h1 className={styles["dropzone__content-label"]}>{label}</h1>
				<p className={styles["dropzone__content-caption"]}>{caption}</p>
			</div>
		</div>
	);
};
