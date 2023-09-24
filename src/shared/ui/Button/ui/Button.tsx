import { nanoid } from "@reduxjs/toolkit";
import cn from "classnames";
import React, { useState } from "react";

import { IButtonProps } from "./Button.interface";

import styles from "./Button.module.scss";

const MAX_RIPPLE_ELEMENTS = 5;

const Button: React.FC<IButtonProps> = ({
	icon: Icon,
	withRipple = true,
	onClick,
	children,
	...buttonProps
}) => {
	const [rippleElements, setRippleElements] = useState<JSX.Element[]>([]);

	const createRippleEl = (size: number, left: string, top: string) => {
		// TODO: Replace nanoid, to not depend on redux toolkit lib.
		const key = nanoid();

		return (
			<div
				key={key}
				className={styles.ripple}
				style={{
					width: size,
					height: size,
					left,
					top
				}}
				onAnimationEnd={() => handleRippleAnimationEnd(key)}
			></div>
		);
	};

	const handleRippleAnimationEnd = (key: string) => {
		setRippleElements(state => state.filter(el => el.key !== key));
	};

	const handleRippleEffect = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (rippleElements.length >= MAX_RIPPLE_ELEMENTS) return;

		const currentTargetEl = event.currentTarget;
		const currentTargetRect = currentTargetEl.getBoundingClientRect();

		const size = Math.max(currentTargetEl.clientHeight, currentTargetEl.clientWidth);
		const left = event.clientX - currentTargetRect.left - size / 2 + "px";
		const top = event.clientY - currentTargetRect.top - size / 2 + "px";
		const rippleEl = createRippleEl(size, left, top);

		setRippleElements(state => [...state, rippleEl]);
	};

	return (
		<button
			{...buttonProps}
			onClick={event => {
				onClick?.(event);

				if (withRipple) {
					handleRippleEffect(event);
				}
			}}
			className={cn(styles.button, {
				// Increase paddings on x axis if there is only text present
				[styles["button_increased-px"]]: !Icon
			})}
		>
			{Icon && <div className={styles.button__icon}>{Icon}</div>}

			{children && <span className={styles.button__text}>{children}</span>}

			{rippleElements}
		</button>
	);
};

export default Button;
