import { Request, Response } from "express";

interface ICity {
  name: string;
}

export const create = (req: Request<{}, {}, ICity>, res: Response) => {
  const data: ICity = req.body;

  console.group("data");
  console.log(data);
  console.groupEnd();

  return res.send("Created!");
};
