import cn from "classnames";
import React, { useState } from "react";
import useMeasure from "react-use-measure";

import { copyToClipboard } from "@/entities/chat/lib/helpers";

import { Icon } from "@/shared/ui";

import { IMetaInfoRowProps } from "./MetaInfoRow.interface";

import styles from "./MetaInfoRow.module.scss";

export const MetaInfoRow: React.FC<IMetaInfoRowProps> = ({
	className,
	iconName,
	value,
	subtitle
}) => {
	const [subtitleRef, subtitleBounds] = useMeasure();
	const [isCopied, setCopied] = useState(false);

	const handleCopyRowValue = () => {
		if (isCopied) return;

		copyToClipboard({
			value,
			onCopy: () => setCopied(true),
			onCopyTimeout: () => setCopied(false)
		});
	};

	return (
		<div
			className={cn(styles.meta, className)}
			onClick={handleCopyRowValue}
		>
			<Icon
				className={styles.meta__icon}
				name={iconName}
			/>

			<div className={styles.meta__wrapper}>
				<p className={styles.meta__value}>{value}</p>

				<p
					className={styles.meta__subtitle}
					style={{ height: subtitleBounds.height }}
				>
					<span
						ref={subtitleRef}
						style={{
							opacity: isCopied ? 0 : 1,
							transform: isCopied
								? `translateY(-${subtitleBounds.height}px)`
								: "translateY(0)"
						}}
					>
						{subtitle}
					</span>

					<span
						style={{
							opacity: isCopied ? 1 : 0,
							transform: isCopied
								? `translateY(-${subtitleBounds.height}px)`
								: "translateY(0)"
						}}
					>
						Copied to clipboard
					</span>
				</p>
			</div>
		</div>
	);
};
