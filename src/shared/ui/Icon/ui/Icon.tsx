import cn from "classnames";
import React from "react";

import sprite from "../assets/sprite.svg";

import { IIconProps } from "./Icon.interface";

import styles from "./Icon.module.scss";

export const Icon: React.FC<IIconProps> = ({
	name,
	isMirrored,
	className,
	width,
	height,
	onClick
}) => {
	return (
		<svg
			width={width || "100%"}
			height={height || "100%"}
			className={cn(className, {
				[styles.mirrored]: isMirrored
			})}
			onClick={onClick}
		>
			<use href={sprite + `#${name}`} />
		</svg>
	);
};
