import React from "react";

import sprite from "../assets/sprite.svg";

import { IconProps } from "./Icon.interface";

const Icon: React.FC<IconProps> = ({ name }) => {
	return (
		<svg
			width="100%"
			height="100%"
		>
			<use href={sprite + `#${name}`} />
		</svg>
	);
};

export default Icon;
