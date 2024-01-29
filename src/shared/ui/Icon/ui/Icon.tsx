import cn from "classnames";
import React from "react";

import sprite from "../assets/sprite.svg";

import { IIconProps } from "./Icon.interface";

export const Icon: React.FC<IIconProps> = ({
	name,
	className,
	width,
	height,
	onClick
}) => {
	return (
		<svg
			width={width || "100%"}
			height={height || "100%"}
			className={cn(className)}
			onClick={onClick}
		>
			<use href={sprite + `#${name}`} />
		</svg>
	);
};
