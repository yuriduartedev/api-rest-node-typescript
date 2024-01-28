import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, ValidationError } from "yup";

type TField = "body" | "header" | "params" | "query";
type TAllSchemas = Record<TField, ObjectSchema<any>>;
type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {
  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([field, schema]) => {
    try {
      schema.validateSync(req[field as TField], { abortEarly: false });
    } catch (error) {
      const yupError = error as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach((err) => {
        if (!err.path) return;
        errors[err.path] = err.message;
      });

      errorsResult[field] = errors;
    }
  });

  const hasErrors = Object.entries(errorsResult).length;

  return hasErrors
    ? res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult })
    : next();
};
