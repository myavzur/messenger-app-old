import React from "react";
import useMeasure from "react-use-measure";

import { UserBadge } from "@/entities/user";

import { useClickOutside } from "@/shared/lib/hooks";

import { Checkbox, Field } from "../..";

import { IMultipleSelectFieldProps } from "./MultipleSelectField.interface";

import styles from "./MultipleSelectField.module.scss";

const safeDropdownBottomOffset = 25; // Pixels

export const MultipleSelectField: React.FC<IMultipleSelectFieldProps> = ({
	selectedOptions,
	options,
	onSelectOption,
	onDeleteOption,
	setSearchValue
}) => {
	const [selectRef, isDropdownOpen, setDropdownOpen] = useClickOutside();
	const [dropdownRef, dropdownBounds] = useMeasure();

	const availableDropdownHeight =
		document.documentElement.clientHeight -
		(dropdownBounds.top + safeDropdownBottomOffset);

	return (
		<div
			className={styles.select}
			ref={selectRef}
			onClick={() => setDropdownOpen(true)}
		>
			<div className={styles.select__field}>
				{selectedOptions.map(option => (
					<UserBadge
						key={option.value}
						className={styles["select__selected-option"]}
						onClick={() => onDeleteOption?.(option)}
						account_name={option.label}
						avatar_url={option.image_url}
					/>
				))}
			</div>

			{isDropdownOpen && options.length > 0 && (
				<div
					className={styles.select__dropdown}
					ref={dropdownRef}
					style={{ maxHeight: availableDropdownHeight + "px" }}
				>
					<input
						className={styles.select__input}
						placeholder="Search"
					/>
					<div className={styles.select__options}>
						{options.map(option => (
							<label
								className={styles.select__option}
								key={option.value}
								onClick={() => onSelectOption?.(option)}
							>
								<Checkbox />
								<UserBadge
									account_name={option.label}
									avatar_url={option.image_url}
								/>
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
