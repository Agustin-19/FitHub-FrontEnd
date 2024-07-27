import { IErrorsLogin, IErrorsRegister, IRegisterUser } from "@/interface/interface";

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
  values: IRegisterUser,
  fieldsToValidate: string[]
) => {
  const errors: IRegisterUser = {
    name: "",
    email: "",
    dni: 0,
    address: "",
    city: "",
    country: "",
    password: "",
    passwordConfirm: "",
    phone: 0,
  }

  if (fieldsToValidate.includes("name") && !values.name) {
    errors.name = "*";
  }

  if (
    fieldsToValidate.includes("email") &&
    (!values.email || !/\S+@\S+\.\S+/.test(values.email))
  ) {
    errors.email = "* Incorrect email format. Example: 4oLZ9@example.com";
  }

  if (fieldsToValidate.includes("dni") && !values.dni) {
    errors.dni = 0;
  }


  if (fieldsToValidate.includes("address") && !values.address) {
    errors.address = "*";
  }

  if (fieldsToValidate.includes("city") && !values.city) {
    errors.city = "*";
  }

  if (fieldsToValidate.includes('country') && !values.country) {
    errors.country = '*';
  }

  if (fieldsToValidate.includes("password") && !values.password) {
    errors.password = "*";
  } else if (values.password && values.password.length < 8) {
    errors.password = "The password must be longer than 8 characters.";
  }

  if (
    fieldsToValidate.includes("passwordConfirm") &&
    values.password !== values.passwordConfirm
  ) {
    errors.passwordConfirm = "The passwords do not match.";
  }

  if (fieldsToValidate.includes("phone") && !values.phone) {
    errors.phone = 0;
  }


  return errors;
};

export { validateRegister, validateLogin };
