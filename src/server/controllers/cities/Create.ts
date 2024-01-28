import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICity {
  name: string;
  state: string;
}

export const createValidator = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3).max(150),
    state: yup.string().required().min(3).max(150),
  }),
});

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  return res.status(StatusCodes.CREATED).json(req.body);
};
