import cn from "classnames";
import React from "react";

import { getElementFromArrayByStringHash, getInitials } from "@/shared/lib/helpers";

import AvatarSvg from "../AvatarSvg";

import { AvatarProps } from "./Avatar.interface";

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

const Avatar: React.FC<AvatarProps> = ({ children, src, alt, size, className }) => {
	let content = null;

	if (src) {
		content = (
			<img
				src={src}
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
		</div>
	);
};

export default Avatar;
