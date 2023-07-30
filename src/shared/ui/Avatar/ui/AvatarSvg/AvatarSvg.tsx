import React from "react";

import { AvatarSvgProps } from "./AvatarSvg.interface";

const AvatarSvg: React.FC<AvatarSvgProps> = ({
	strokeColor = "#FFFFFF",
	fillColor,
	text
}) => {
	return (
		<svg
			className="vjs-chat-avatar-svg"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
		>
			<circle
				r="48"
				cx="50"
				cy="50"
				fill={fillColor}
				stroke={strokeColor}
				strokeWidth="4"
			/>

			<text
				x="50%"
				y="50%"
				dominantBaseline="mathematical"
				textAnchor="middle"
				fill={strokeColor}
				style={{ fontSize: "32px" }}
			>
				{text}
			</text>
		</svg>
	);
};

export default AvatarSvg;
