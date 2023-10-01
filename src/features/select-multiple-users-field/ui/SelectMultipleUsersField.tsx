import React, { useEffect, useState } from "react";

import { UserBadge } from "@/entities/user";

import { baseApi } from "@/shared/api";
import { ISelectFieldOption } from "@/shared/interfaces/select-field-option.interface";
import { Checkbox, MultipleSelectField } from "@/shared/ui";

import { ISelectMultipleUsersFieldProps } from "./SelectMultipleUsersField.interface";

export const SelectMultipleUsersField: React.FC<ISelectMultipleUsersFieldProps> = ({
	value,
	setValue,
	onChangeSelectedOptions
}) => {
	const [selectedOptions, setSelectedOptions] = useState<ISelectFieldOption[]>([]);
	const { data: users } = baseApi.useGetUsersBasedOnLocalChatsQuery();

	const selectOption = (option: ISelectFieldOption) => {
		setSelectedOptions([...selectedOptions, option]);
	};

	const deleteOption = (option: ISelectFieldOption) => {
		setSelectedOptions(
			selectedOptions.filter(selectedOption => selectedOption.value != option.value)
		);
	};

	useEffect(() => {
		onChangeSelectedOptions(selectedOptions);
	}, [selectedOptions]);

	if (!users) {
		return "Loading";
	}

	const options: ISelectFieldOption[] =
		users.map(user => ({
			label: user.account_name,
			value: String(user.id),
			image_url: user.avatar_url
		})) || [];

	return (
		<MultipleSelectField
			value={value}
			setValue={setValue}
			options={options}
			renderOption={option => (
				<UserBadge
					key={option.value}
					account_name={option.label}
					avatar_url={option.image_url}
					onClick={() => selectOption(option)}
				/>
			)}
			selectedOptions={selectedOptions}
			renderSelectedOption={option => (
				<label
					key={option.value}
					onClick={() => setSelectedOptions(state => [...state, option])}
				>
					<Checkbox />
					<UserBadge
						account_name={option.label}
						avatar_url={option.image_url}
						onClick={() => deleteOption(option)}
					/>
				</label>
			)}
		/>
	);
};
