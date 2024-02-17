import { animated, config, useTransition } from "@react-spring/web";
import cn from "classnames";
import React from "react";

import { getElementFromArrayByStringHash, getInitials } from "@/shared/lib/helpers";

import { IAvatarProps } from "./Avatar.interface";
import AvatarSvg from "./AvatarSvg";

import styles from "./Avatar.module.scss";

const fillColors = [
	"#E7320B",
	"#FF4D00",
	"#F55A50",
	"#DB7600",
	"#FFA300",
	"#5AA100",
	"#009B87",
	"#16AFCA",
	"#4856D1",
	"#E7289A",
	"#992BAE",
	"#577889"
];

const uploadsServerUrl = import.meta.env.VITE_UPLOADS_SERVER_URL || "/";

export const Avatar: React.FC<IAvatarProps> = ({
	children,
	serverUrl = uploadsServerUrl,
	src,
	alt,
	size,
	status,
	className
}) => {
	const indicatorTransition = useTransition(
		typeof status === "number" && status > 0,
		{
			from: { scale: 0 },
			enter: { scale: 1 },
			leave: { scale: 0 },
			config: config.wobbly
		}
	);

	let content = null;

	if (src) {
		content = (
			<img
				src={serverUrl + src}
				alt={alt}
			/>
		);
	} else {
		content = (
			<AvatarSvg
				fillColor={getElementFromArrayByStringHash(fillColors, children)}
				text={getInitials(children)}
			/>
		);
	}

	return (
		<div
			className={cn(styles.avatar, className, {
				[styles[`avatar_size_${size}`]]: Boolean(size)
			})}
		>
			{content}

			{indicatorTransition(
				(style, isIndicatorVisible) =>
					isIndicatorVisible && (
						<animated.div
							className={cn(styles.avatar__indicator)}
							data-type={status || 0}
							style={style}
						/>
					)
			)}
		</div>
	);
};
