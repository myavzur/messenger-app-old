import cn from "classnames";
import React, { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

import { useClickOutside } from "@/shared/lib/hooks";
import { InlineInput } from "@/shared/ui";

import {
	ISelectUserOption,
	ISelectUsersFieldProps
} from "./SelectUsersField.interface";

import styles from "./SelectUsersField.module.scss";

const safeDropdownBottomOffset = 25; // Pixels

export const SelectUsersField: React.FC<ISelectUsersFieldProps> = ({
	onChange,
	onSearch,
	options,
	renderOption
}) => {
	const [selectedOptions, setSelectedOptions] = useState<ISelectUserOption[]>([]);
	const [selectRef, isDropdownOpen, setDropdownOpen] =
		useClickOutside<HTMLDivElement>();
	const [dropdownRef, dropdownBounds] = useMeasure();

	const availableDropdownHeight =
		document.documentElement.clientHeight -
		(dropdownBounds.top + safeDropdownBottomOffset);

	const addOption = (option: ISelectUserOption) => {
		setSelectedOptions(selectedOptions => [...selectedOptions, option]);
	};

	const deleteOption = (option: ISelectUserOption) => {
		setSelectedOptions(selectedOptions =>
			selectedOptions.filter(selectedOption => selectedOption.value !== option.value)
		);
	};

	const toggleSelected = (option: ISelectUserOption) => {
		const isSelected = Boolean(
			selectedOptions.find(selectedOption => selectedOption.value === option.value)
		);

		if (isSelected) {
			deleteOption(option);
			return;
		}

		addOption(option);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (value.length === 0) setDropdownOpen(false);
		else setDropdownOpen(true);

		onSearch?.(e.target.value);
	};

	useEffect(() => {
		onChange?.(selectedOptions);
	}, [onChange, selectedOptions]);

	let optionsContent: React.ReactNode;

	if (options && options.length > 0) {
		optionsContent = options.map(option => {
			const isSelected = Boolean(
				selectedOptions.find(selectedOption => selectedOption.value === option.value)
			);

			return (
				<div
					className={cn(styles.option, { [styles.option_highlighted]: isSelected })}
					key={option.value}
					onClick={() => toggleSelected(option)}
				>
					{renderOption(option)}
				</div>
			);
		});
	} else {
		optionsContent = <p>Unhandled case!</p>;
	}

	return (
		<div
			className={styles.select}
			ref={selectRef}
			onClick={() => setDropdownOpen(true)}
		>
			<div className={styles.select__selected}>
				{selectedOptions.map(option => (
					<span
						className={styles.option}
						key={option.value}
						onClick={() => deleteOption(option)}
					>
						{option.label}
					</span>
				))}

				<InlineInput onChange={handleSearch} />
			</div>

			{isDropdownOpen && (
				<div
					className={styles.select__dropdown}
					ref={dropdownRef}
					style={{ maxHeight: availableDropdownHeight + "px" }}
				>
					<div className={styles.select__options}>{optionsContent}</div>
				</div>
			)}
		</div>
	);
};
