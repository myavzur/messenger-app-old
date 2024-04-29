import cn from "classnames";
import React from "react";

import { ISliderIndicatorProps } from "./SliderIndicator.interface";

import styles from "./SliderIndicator.module.scss";

export const SliderIndicator: React.FC<ISliderIndicatorProps> = ({
	onClick,
	isActive
}) => {
	return (
		<li
			className={cn(styles.indicator, {
				[styles.indicator_active]: isActive
			})}
			onClick={onClick}
		/>
	);
};
