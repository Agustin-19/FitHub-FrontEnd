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
    errors.email = "El formato del email de ser: ejemplo@ejemplo.com";
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
  } else if (values.name) {
    if (values.name.length < 3 || values.name.length > 80) {
      errors.name = "El nombre debe tener entre 3 y 80 caracteres.";
    }
  }

  if (fieldsToValidate.includes("email") && !values.email) {
    errors.email = "*";
  } else if (values.email) {
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El email es incorrecto. Ejemplo: 4oLZ9@example.com";
    }
  }

  if (fieldsToValidate.includes("dni") && !values.dni) {
    errors.dni = "*";
  } else if (values.dni) {
    if (values.dni.length < 8 || values.dni.length > 8) {
      errors.dni = "El DNI debe tener 8 digitos.";
    }
  }

  if (fieldsToValidate.includes("address") && !values.address) {
    errors.address = "*";
  } else if (values.address) {
    if (values.address.length < 3 || values.address.length > 100) {
      errors.address = "La dirección debe tener entre 3 y 100 caracteres.";
    }
  }

  if (fieldsToValidate.includes("city") && !values.city) {
    errors.city = "*";
  } else if (values.city) {
    if (values.city.length < 5 || values.city.length > 20) {
      errors.city = "La ciudad debe tener entre 5 y 20 caracteres.";
    }
  }

  if (fieldsToValidate.includes("country") && !values.country) {
    errors.country = "*";
  } else if (values.country) {
    if (values.country.length < 5 || values.country.length > 20) {
      errors.country = "El pais debe tener entre 5 y 20 caracteres.";
    }
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
    errors.passwordConfirm = "Las contraseñas no coinciden.";
  }

  if (fieldsToValidate.includes("phone") && !values.phone) {
    errors.phone = "*";
  } else if (values.phone) {
    if (values.phone.length >= 10) {
      errors.phone = "El número de teléfono debe tener 10 dígitos.";
    }
  }

  return errors;
};

export { validateRegister, validateLogin };
