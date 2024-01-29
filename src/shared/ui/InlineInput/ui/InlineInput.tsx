import React, { InputHTMLAttributes, useRef } from "react";

import styles from "./InlineInput.module.scss";

export const InlineInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
	...inputProps
}) => {
	const { onChange } = inputProps;

	const inputElRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputEl = inputElRef.current;
		if (!inputEl) return;

		const tempSpanEl = document.createElement("span");
		tempSpanEl.style.visibility = "hidden";
		tempSpanEl.style.position = "absolute";
		tempSpanEl.style.font = window.getComputedStyle(inputEl).font;
		document.body.appendChild(tempSpanEl);
		tempSpanEl.textContent = e.target.value;

		const spanWidth = tempSpanEl.getBoundingClientRect().width + 4;
		inputEl.style.width = `${spanWidth}px`;

		tempSpanEl.remove();
		onChange?.(e);
	};

	return (
		<input
			{...inputProps}
			ref={inputElRef}
			onChange={handleChange}
			className={styles.input}
			type="text"
		/>
	);
};
