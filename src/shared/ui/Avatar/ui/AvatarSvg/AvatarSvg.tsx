import React from "react";

import { IAvatarSvgProps } from "./AvatarSvg.interface";

const AvatarSvg: React.FC<IAvatarSvgProps> = ({ fillColor, text }) => {
	return (
		<svg
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
		>
			<circle
				r="50"
				cx="50"
				cy="50"
				fill={fillColor}
			/>

			<text
				x="50%"
				y="50%"
				dominantBaseline="mathematical"
				textAnchor="middle"
				fill="#FFF"
				style={{ fontSize: "35px" }}
			>
				{text}
			</text>
		</svg>
	);
};

export default AvatarSvg;
