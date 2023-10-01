import React from "react";
import useMeasure from "react-use-measure";

import { useClickOutside } from "@/shared/lib/hooks";

import { IMultipleSelectFieldProps } from "./MultipleSelectField.interface";

import styles from "./MultipleSelectField.module.scss";

const safeDropdownBottomOffset = 25; // Pixels

export const MultipleSelectField: React.FC<IMultipleSelectFieldProps> = ({
	value,
	setValue,
	selectedOptions,
	renderSelectedOption,
	options,
	renderOption
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
				{selectedOptions.map(option => renderSelectedOption(option))}
			</div>

			{isDropdownOpen && options && options.length > 0 && (
				<div
					className={styles.select__dropdown}
					ref={dropdownRef}
					style={{ maxHeight: availableDropdownHeight + "px" }}
				>
					<input
						className={styles.select__input}
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder="Search"
					/>
					<div className={styles.select__options}>
						{options.map(option => renderOption(option))}
					</div>
				</div>
			)}
		</div>
	);
};
