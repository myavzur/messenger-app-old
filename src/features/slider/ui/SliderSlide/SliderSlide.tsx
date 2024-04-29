import cn from "classnames";
import React from "react";

import { bgFillColors } from "@/shared/constants";
import { getElementFromArrayByStringHash, getInitials } from "@/shared/lib/helpers";
import AvatarSvg from "@/shared/ui/Avatar/ui/AvatarSvg";

import { ISliderSlideProps } from "./SliderSlide.interface";

import styles from "./SliderSlide.module.scss";

export const SliderSlide: React.FC<ISliderSlideProps> = ({
	defaultAvatarText = "NULL",
	contentType = "image",
	onImageError,
	attachment,
	isActive = false,
	width,
	height
}) => {
	return (
		<li
			className={cn(styles.slide, {
				[styles.slide_active]: isActive
			})}
			style={{
				width: width,
				height: height
			}}
		>
			{contentType === "image" && attachment?.id ? (
				<img
					src={attachment.file_url}
					alt={attachment.file_name}
					onError={onImageError}
				/>
			) : (
				<AvatarSvg
					fillColor={getElementFromArrayByStringHash(
						bgFillColors,
						defaultAvatarText
					)}
					text={getInitials(defaultAvatarText)}
				/>
			)}
		</li>
	);
};
