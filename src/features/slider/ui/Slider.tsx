import cn from "classnames";
import React, { useState } from "react";
import useMeasure from "react-use-measure";

import { IAttachment } from "@/entities/attachment/interfaces";

import { bgFillColors } from "@/shared/constants";
import { getElementFromArrayByStringHash, getInitials } from "@/shared/lib/helpers";
import { Icon } from "@/shared/ui";
import AvatarSvg from "@/shared/ui/Avatar/ui/AvatarSvg";

import { ISliderProps } from "./Slider.interface";

import styles from "./Slider.module.scss";

export const Slider: React.FC<ISliderProps> = ({
	attachments = [],
	emptyPicturesText
}) => {
	// Изображения, которые не ушли в ошибку.
	const [validAttachments, setValidAttachments] =
		useState<IAttachment[]>(attachments);

	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [sliderWindowRef, sliderWindowBounds] = useMeasure();

	const isPreviousDisabled = currentSlideIndex === 0;
	const isNextDisabled =
		!validAttachments.length || currentSlideIndex === validAttachments.length - 1;

	const slideHeight = sliderWindowBounds.width;
	const slideWidth = Math.max(sliderWindowBounds.width, 0);

	const handlePreviousSlide = () => {
		if (isPreviousDisabled) return;
		setCurrentSlideIndex(currentSlideIndex - 1);
	};

	const handleNextSlide = () => {
		if (isNextDisabled) return;
		setCurrentSlideIndex(currentSlideIndex + 1);
	};

	const renderSlides = () => {
		const slideStyles = {
			width: slideWidth,
			height: slideHeight
		} as React.CSSProperties;

		if (validAttachments.length > 0) {
			return validAttachments.map((attachment, idx) => (
				<li
					key={idx}
					className={cn(styles.slider__slide, {
						[styles.slider__slide_active]: idx === currentSlideIndex
					})}
					style={slideStyles}
				>
					<img
						src={attachment.file_url}
						alt={attachment.file_name}
						onError={() =>
							setValidAttachments(prev => prev.filter((_, i) => i !== idx))
						}
					/>
				</li>
			));
		}

		return (
			<li
				className={cn(styles.slider__slide, styles.slider__slide_active)}
				style={slideStyles}
			>
				<AvatarSvg
					fillColor={getElementFromArrayByStringHash(
						bgFillColors,
						emptyPicturesText
					)}
					text={getInitials(emptyPicturesText)}
				/>
			</li>
		);
	};

	return (
		<div className={styles.slider}>
			<div
				className={styles.slider__window}
				ref={sliderWindowRef}
			>
				<ul
					className={styles.slider__slides}
					style={{ transform: `translateX(-${currentSlideIndex * slideWidth}px)` }}
				>
					{renderSlides()}
				</ul>
			</div>

			<ul className={styles.slider__indicators}>
				{validAttachments.length > 1 &&
					validAttachments.map((_, idx) => (
						<li
							key={idx}
							className={cn(styles.slider__indicator, {
								[styles.slider__indicator_active]: idx === currentSlideIndex
							})}
							onClick={() => setCurrentSlideIndex(idx)}
						/>
					))}
			</ul>

			{!isPreviousDisabled && (
				<button
					className={cn(styles.slider__control, styles.slider__control_previous)}
					onClick={handlePreviousSlide}
				>
					<Icon
						className={styles["slider__control-icon"]}
						name="arrow-right"
					/>
				</button>
			)}

			{!isNextDisabled && (
				<button
					className={cn(styles.slider__control, styles.slider__control_next)}
					onClick={handleNextSlide}
				>
					<Icon
						className={styles["slider__control-icon"]}
						name="arrow-right"
					/>
				</button>
			)}
		</div>
	);
};
