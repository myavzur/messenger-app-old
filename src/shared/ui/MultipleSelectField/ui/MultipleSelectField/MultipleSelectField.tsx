import React, { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

import { useClickOutside } from "@/shared/lib/hooks";
import { Checkbox } from "@/shared/ui";

import { IOption } from "../..";
import { Option } from "../Option";

import { IMultipleSelectFieldProps } from "./MultipleSelectField.interface";

import styles from "./MultipleSelectField.module.scss";

const safeDropdownBottomOffset = 25; // Pixels

export const MultipleSelectField: React.FC<IMultipleSelectFieldProps> = ({
	searchTerm,
	setSearchTerm,
	isLoadingOptions,
	options,
	onUpdate
}) => {
	const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
	const [selectRef, isDropdownOpen, setDropdownOpen] = useClickOutside();
	const [dropdownRef, dropdownBounds] = useMeasure();

	const availableDropdownHeight =
		document.documentElement.clientHeight -
		(dropdownBounds.top + safeDropdownBottomOffset);

	const handleDelete = (option: IOption) => {
		setSelectedOptions(selectedOptions =>
			selectedOptions.filter(sOption => sOption.value !== option.value)
		);
	};

	const toggleSelect = (option: IOption) => {
		if (selectedOptions.find(sOption => sOption.value === option.value)) {
			handleDelete(option);
		} else {
			setSelectedOptions([...selectedOptions, option]);
		}
	};

	useEffect(() => {
		onUpdate?.(selectedOptions);
	}, [selectedOptions]);

	let optionsContent: React.ReactNode;

	if (isLoadingOptions) {
		optionsContent = <p>Loading!</p>;
	} else if (options && options.length > 0) {
		optionsContent = options.map(option => (
			<label
				className={styles["select__option"]}
				key={option.value}
				onClick={() => toggleSelect(option)}
			>
				<Checkbox
					checked={Boolean(selectedOptions.find(so => so.value === option.value))}
					readOnly={true}
				/>
				<Option {...option} />
			</label>
		));
	} else {
		optionsContent = <p>Unhandled case!</p>;
	}

	return (
		<div
			className={styles.select}
			ref={selectRef}
			onClick={() => setDropdownOpen(true)}
		>
			<div className={styles["select__selected-options"]}>
				{selectedOptions.map((option, idx) => (
					<Option
						className={styles.select__option}
						key={option.value}
						onClick={() => handleDelete(option)}
						{...option}
					/>
				))}
			</div>

			{isDropdownOpen && (
				<div
					className={styles.select__dropdown}
					ref={dropdownRef}
					style={{ maxHeight: availableDropdownHeight + "px" }}
				>
					{searchTerm && setSearchTerm && (
						<input
							className={styles.select__input}
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							placeholder="Search"
						/>
					)}

					<div className={styles.select__options}>{optionsContent}</div>
				</div>
			)}
		</div>
	);
};
