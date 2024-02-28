import cn from "classnames";
import React, { useState } from "react";

import { bgFillColors } from "@/shared/constants";
import { getElementFromArrayByStringHash, getInitials } from "@/shared/lib/helpers";

import { IAvatarProps } from "./Avatar.interface";
import AvatarSvg from "./AvatarSvg";

import styles from "./Avatar.module.scss";

export const Avatar: React.FC<IAvatarProps> = ({
	src,
	alt,
	size,
	placeholderSvgText,
	className
}) => {
	const [isImageValid, setImageValid] = useState(true);

	let content = null;

	if (src && isImageValid) {
		content = (
			<img
				src={src}
				alt={alt}
				onError={() => setImageValid(false)}
			/>
		);
	} else {
		content = (
			<AvatarSvg
				fillColor={getElementFromArrayByStringHash(bgFillColors, placeholderSvgText)}
				text={getInitials(placeholderSvgText)}
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
