import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Este campo é obrigatório",
  },
  string: {
    min: "Deve conter no mínimo ${min} caracteres",
    max: "Deve conter no máximo ${max} caracteres",
  },
});
