import React, { useState } from "react";
import useMeasure from "react-use-measure";

import { IAttachment } from "@/entities/attachment/interfaces";

import { ISliderProps } from "./Slider.interface";
import { SliderArrowButton } from "./SliderArrowButton";
import { SliderIndicator } from "./SliderIndicator";
import { SliderSlide } from "./SliderSlide/SliderSlide";

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

	const isIndicatorsEnabled = validAttachments.length > 1;
	const isPreviousDisabled = currentSlideIndex === 0;
	const isNextDisabled =
		!validAttachments.length || currentSlideIndex === validAttachments.length - 1;

	const slideHeight = sliderWindowBounds.width;
	const slideWidth = Math.max(sliderWindowBounds.width, 0);

	const removeFromValidAttachments = (attachment: IAttachment) => {
		setValidAttachments(prev => prev.filter(({ id }) => id !== attachment.id));
	};

	const handlePreviousSlide = () => {
		if (isPreviousDisabled) return;
		setCurrentSlideIndex(currentSlideIndex - 1);
	};

	const handleNextSlide = () => {
		if (isNextDisabled) return;
		setCurrentSlideIndex(currentSlideIndex + 1);
	};

	const renderSlides = () => {
		if (validAttachments.length > 0) {
			return validAttachments.map((attachment, idx) => (
				<SliderSlide
					key={attachment.id}
					contentType="image"
					attachment={attachment}
					height={slideHeight}
					width={slideWidth}
					onImageError={() => removeFromValidAttachments(attachment)}
					isActive={idx === currentSlideIndex}
				/>
			));
		}

		return (
			<SliderSlide
				defaultAvatarText={emptyPicturesText}
				contentType="default-avatar"
				height={slideHeight}
				width={slideWidth}
				isActive={true}
			/>
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
				{isIndicatorsEnabled &&
					validAttachments.map((_, idx) => (
						<SliderIndicator
							key={idx}
							isActive={currentSlideIndex === idx}
							onClick={() => setCurrentSlideIndex(idx)}
						/>
					))}
			</ul>

			{!isPreviousDisabled && (
				<SliderArrowButton
					onClick={handlePreviousSlide}
					position="left"
				/>
			)}

			{!isNextDisabled && (
				<SliderArrowButton
					onClick={handleNextSlide}
					position="right"
				/>
			)}
		</div>
	);
};
