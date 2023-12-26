import * as yup from "yup";

export const signInSchema = () => {
	const schema = yup.object({
		email: yup
			.string()
			.required("Email is required")
			.matches(
				/^[a-zA-Z0-9]+([_\.\-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\.\-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/g,
				"Email is invalid"
			),
		password: yup
			.string()
			.trim()
			.required("Password is required")
			.min(6, "Password need to be 6 - 20 characters")
			.max(20, "Password need to be 6 - 20 characters")
			.matches(
				/^[^\sáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]+$/u,
				"Password is invalid"
			),
	});
	return schema;
};

// export const registerSchema = (t: CustomTypeConfig<string>) =>
// 	yup.object({
// 		phone_number: yup
// 			.string()
// 			.typeError(t.txt_phone_placeholder)
// 			.required(t.txt_phone_placeholder)
// 			.min(6, t.txt_invalid_phone_number)
// 			.matches(/^\+\d{1,3}\d{5,19}$/, t.txt_invalid_phone_number),
// 		custom_tel_phone_number: yup
// 			.string()
// 			.typeError(t.txt_phone_placeholder)
// 			.required(t.txt_phone_placeholder)
// 			.min(6, t.txt_invalid_phone_number),
// 		first_name: yup
// 			.string()
// 			.trim()
// 			.required(t.txt_please_enter_your_first_name)
// 			.max(255, t.txt_this_field_is_invalid),
// 		last_name: yup
// 			.string()
// 			.trim()
// 			.required(t.txt_please_enter_your_last_name)
// 			.max(255, t.txt_this_field_is_invalid),
// 		email: yup
// 			.string()
// 			.required(t.txt_email_address_placeholder)
// 			.matches(
// 				// eslint-disable-next-line no-useless-escape
// 				/^[a-zA-Z0-9]+([_\.\-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\.\-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/g,
// 				t.txt_email_not_valid
// 			),
// 		password: yup
// 			.string()
// 			.trim()
// 			.required(t.txt_please_enter_your_pass)
// 			.min(6, t.txt_validate_password)
// 			.max(20, t.txt_validate_password)
// 			.matches(
// 				/^[^\sáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]+$/u,
// 				t.txt_format_password
// 			),
// 	});
