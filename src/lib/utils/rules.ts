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
        // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
        "Password is invalid"
      ),
  });
  return schema;
};

export const signUpSchema = () =>
  yup.object({
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .min(6, "Phone Number is invalid")
      .matches(/^\d{1,3}\d{5,19}$/, "Phone Number is invalid"),
    name: yup
      .string()
      .trim()
      .required("Full Name is required")
      .max(255, "Full Name is invalid"),

    email: yup
      .string()
      .required("Email is required")
      .matches(
        // eslint-disable-next-line no-useless-escape
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

export const createProjectSchema = () =>
  yup.object({
    projectName: yup
      .string()
      .trim()
      .required("Project Name is required")
      .max(255, "Project Name is invalid"),
    categoryId: yup.number().required("Project Category is required"),
  });
