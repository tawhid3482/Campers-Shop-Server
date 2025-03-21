import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AnyZodObject } from "zod";

const validationRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};
export default validationRequest