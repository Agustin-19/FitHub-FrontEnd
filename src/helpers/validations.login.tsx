import {
  IErrorsLogin,
  IErrorsRegister,
  IRegisterUser,
} from "@/interface/interface";

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
  } else if (values.password) {
    if (values.password.length < 8 || values.password.length > 15) {
      errors.password = "La contraseña debe tener entre 8 y 15 caracteres.";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una mayúscula.";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una minúscula.";
    } else if (!/\d/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(values.password)) {
      errors.password =
        "La contraseña debe contener al menos un carácter especial.";
    }
  }

  return errors;
};

const validateRegister = (
  values: IErrorsRegister,
  fieldsToValidate: string[]
) => {
  const errors: IErrorsRegister = {
    name: "",
    email: "",
    dni: "",
    address: "",
    city: "",
    country: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    delete: false,
  };

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
    errors.dni = "*";
  }

  if (fieldsToValidate.includes("address") && !values.address) {
    errors.address = "*";
  }

  if (fieldsToValidate.includes("city") && !values.city) {
    errors.city = "*";
  }

  if (fieldsToValidate.includes("country") && !values.country) {
    errors.country = "*";
  }

  if (fieldsToValidate.includes("password") && !values.password) {
    errors.password = "*";
  } else if (values.password) {
    if (values.password.length < 8 || values.password.length > 15) {
      errors.password = "La contraseña debe tener entre 8 y 15 caracteres.";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una mayúscula.";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una minúscula.";
    } else if (!/\d/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(values.password)) {
      errors.password =
        "La contraseña debe contener al menos un carácter especial.";
    }
  }

  if (
    fieldsToValidate.includes("passwordConfirm") &&
    values.password !== values.passwordConfirm
  ) {
    errors.passwordConfirm = "The passwords do not match.";
  }

  if (fieldsToValidate.includes("phone") && !values.phone) {
    errors.phone = "*";
  }

  return errors;
};

export { validateRegister, validateLogin };
