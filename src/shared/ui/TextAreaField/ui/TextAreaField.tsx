import { animated, useSpring } from "@react-spring/web";
import cn from "classnames";
import React, { Children, forwardRef, useCallback, useRef } from "react";

import fieldStyles from "@/shared/styles/Field.module.scss";

import { ITextAreaFieldProps } from "./TextAreaField.interface";

import styles from "./TextAreaField.module.scss";

export const TextAreaField = forwardRef<HTMLTextAreaElement, ITextAreaFieldProps>(
	(props, ref) => {
		const {
			maxGrowHeight,
			preventBorderTop,
			shouldHandleEnterKey,
			onChange,
			isInvalid,
			className,
			children,
			...textareaProps
		} = props;
		const initialTextAreaElementHeight = useRef<number>(0);
		const textAreaElementRef = useRef<HTMLTextAreaElement | null>(null);

		const [textAreaProps, animateTextArea] = useSpring(() => ({}));

		const setRefs = useCallback(
			(element: HTMLTextAreaElement) => {
				textAreaElementRef.current = element;

				// Save initial height of text area for correct reset.
				if (textAreaElementRef.current && !initialTextAreaElementHeight.current) {
					initialTextAreaElementHeight.current = element.scrollHeight;
				}

				if (typeof ref === "function") {
					ref(element);
					return;
				}

				if (ref) {
					ref.current = element;
				}
			},
			[ref]
		);

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			if (!maxGrowHeight) {
				onChange?.(e);
				return;
			}

			const textAreaEl = textAreaElementRef.current;
			if (!textAreaEl) return;

			// Сбрасываем, чтобы высота уменьшалась при удалении текста.
			textAreaEl.style.height = "0px";

			const height = Math.min(textAreaEl.scrollHeight, maxGrowHeight);
			textAreaEl.style.height = `${height}px`;

			animateTextArea.start({ height });
			onChange?.(e);
		};

		const handleEnterPress: React.KeyboardEventHandler = e => {
			const textAreaEl = textAreaElementRef.current;
			if (!textAreaEl) return;

			if (e.key === "Enter" && !e.shiftKey && shouldHandleEnterKey) {
				animateTextArea.start({ height: initialTextAreaElementHeight.current });
			}
		};

		return (
			<div
				className={cn(
					fieldStyles.field,
					{
						[fieldStyles.field_invalid]: isInvalid,
						[fieldStyles["field_prevent-pr"]]: Children.count(children) > 0,
						[fieldStyles["field_prevent-border-t"]]: preventBorderTop
					},
					className
				)}
			>
				<animated.textarea
					{...textareaProps}
					className={styles.textarea}
					style={textAreaProps}
					rows={1}
					ref={setRefs}
					onChange={handleChange}
					onKeyDown={handleEnterPress}
				/>

				{children}
			</div>
		);
	}
);

TextAreaField.displayName = "TextAreaField";
