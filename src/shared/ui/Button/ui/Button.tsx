import cn from "classnames";
import React, { useState } from "react";

import { IButtonProps } from "./Button.interface";

import styles from "./Button.module.scss";

const MAX_RIPPLE_ELEMENTS = 5;

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
	(
		{
			iconElement,
			withRipple = true,
			isFullRounded = false,
			isFullWidth = false,
			color,
			onClick,
			className,
			children,
			...buttonProps
		},
		ref
	) => {
		const [rippleElements, setRippleElements] = useState<JSX.Element[]>([]);

		const createRippleEl = (size: number, left: string, top: string) => {
			const key = String(Date.now());

			return (
				<div
					key={key}
					className={styles.button__ripple}
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

			const size = Math.max(
				currentTargetEl.clientHeight,
				currentTargetEl.clientWidth
			);
			const left = event.clientX - currentTargetRect.left - size / 2 + "px";
			const top = event.clientY - currentTargetRect.top - size / 2 + "px";
			const rippleEl = createRippleEl(size, left, top);

			setRippleElements(state => [...state, rippleEl]);
		};

		return (
			<button
				{...buttonProps}
				ref={ref}
				onClick={event => {
					onClick?.(event);

					if (withRipple) {
						handleRippleEffect(event);
					}
				}}
				className={cn(styles.button, className, {
					// Increase paddings on x axis if there is only text present
					[styles["button_increased-px"]]: !iconElement,
					[styles["button_full-rounded"]]: isFullRounded,
					[styles["button_full-width"]]: isFullWidth,
					[styles[`button_color-${color}`]]: Boolean(color)
				})}
			>
				{iconElement && <div className={styles.button__icon}>{iconElement}</div>}
				{children && <span className={styles.button__text}>{children}</span>}

				{rippleElements}
			</button>
		);
	}
);

Button.displayName = "Button";
