import cn from "classnames";
import React from "react";

import { Icon } from "@/shared/ui";

import { ISliderArrowButtonProps } from "./SliderArrowButton.interface";

import styles from "./SliderArrowButton.module.scss";

export const SliderArrowButton: React.FC<ISliderArrowButtonProps> = ({
	onClick,
	position = "right"
}) => {
	return (
		<button
			className={cn(styles.control, {
				[styles.control_left]: position === "left",
				[styles.control_right]: position === "right"
			})}
			onClick={onClick}
		>
			<Icon
				className={styles["control-icon"]}
				name="arrow-right"
			/>
		</button>
	);
};
