import { IErrorsLogin, IErrorsRegister } from "@/interface/interface";

const validateLogin = (values: IErrorsLogin, fieldsToValidate: string[]) => {
  const errors: IErrorsLogin = {};

  if (
    fieldsToValidate.includes("email") &&
    (!values.email || !/\S+@\S+\.\S+/.test(values.email))
  ) {
    errors.email = "* Incorrect email format. Example: 4oLZ9@example.com";
  }

  if (fieldsToValidate.includes("password") && !values.password) {
    errors.password = "*";
  } else if (values.password && values.password.length < 8) {
    errors.password = "The password must be longer than 8 characters.";
  }

  return errors;
};

const validateRegister = (
  values: IErrorsRegister,
  fieldsToValidate: string[]
) => {
  const errors: IErrorsRegister = {};

  if (fieldsToValidate.includes("name") && !values.name) {
    errors.name = "*";
  }

  if (
    fieldsToValidate.includes("email") &&
    (!values.email || !/\S+@\S+\.\S+/.test(values.email))
  ) {
    errors.email = "* Incorrect email format. Example: 4oLZ9@example.com";
  }

  if (fieldsToValidate.includes("address") && !values.address) {
    errors.address = "*";
  }

  if (fieldsToValidate.includes("city") && !values.city) {
    errors.city = "*";
  }

  if (fieldsToValidate.includes("password") && !values.password) {
    errors.password = "*";
  } else if (values.password && values.password.length < 8) {
    errors.password = "The password must be longer than 8 characters.";
  }

  if (
    fieldsToValidate.includes("repeat_password") &&
    values.password !== values.repeat_password
  ) {
    errors.repeat_password = "The passwords do not match.";
  }

  if (fieldsToValidate.includes("phone") && !values.phone) {
    errors.phone = "*";
  }

  return errors;
};

export { validateRegister, validateLogin };
