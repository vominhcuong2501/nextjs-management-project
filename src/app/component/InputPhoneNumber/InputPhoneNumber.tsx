import React from "react";
import Select from "react-select";

const countries = [
	{ label: "United States", value: "+1" },
	{ label: "United Kingdom", value: "+44" },
	// Thêm các quốc gia khác cần thiết
];

const InputPhoneNumber = ({
	phoneNumber,
	onChangePhoneNumber,
	selectedCountry,
	onSelectCountry,
}: any) => {
	return (
		<div>
			<label>Country Code:</label>
			<Select
				options={countries}
				value={selectedCountry}
				onChange={onSelectCountry}
			/>
			<label>Phone Number:</label>
			<input
				type="tel"
				value={phoneNumber}
				onChange={(e) => onChangePhoneNumber(e.target.value)}
			/>
		</div>
	);
};

export default InputPhoneNumber;
