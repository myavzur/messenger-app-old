import { animated, config, useTransition } from "@react-spring/web";
import cn from "classnames";
import React from "react";

import { UserStatus } from "@/entities/user/interfaces";

import { getInitials } from "@/shared/lib/helpers";
import { Avatar } from "@/shared/ui";

import { IAvatarCircleProps } from "./AvatarCircle.interface";

import styles from "./AvatarCircle.module.scss";

const uploadsServerUrl = import.meta.env.VITE_UPLOADS_SERVER_URL || "/";

export const AvatarCircle: React.FC<IAvatarCircleProps> = ({
	attachment,
	placeholderSvgText,
	status = UserStatus.OFFLINE,
	size,
	className
}) => {
	const isIndicatorVisible =
		typeof status === "number" && status !== UserStatus.OFFLINE;

	const indicatorTransition = useTransition(isIndicatorVisible, {
		from: { scale: 0 },
		enter: { scale: 1 },
		leave: { scale: 0 },
		config: config.wobbly
	});

	return (
		<div
			className={cn(styles.avatar, className, {
				[styles[`avatar_size_${size}`]]: Boolean(size)
			})}
		>
			<Avatar
				placeholderSvgText={getInitials(placeholderSvgText)}
				alt={placeholderSvgText}
				src={uploadsServerUrl + attachment?.file_url}
				size={size}
			/>

			{indicatorTransition(
				(style, isIndicatorVisible) =>
					isIndicatorVisible && (
						<animated.div
							className={styles.avatar__indicator}
							data-type={status}
							style={style}
						/>
					)
			)}
		</div>
	);
};
