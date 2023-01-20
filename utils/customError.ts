import { ValidationError } from "express-validator/src/base";

export class CustomError {
  constructor(
    public name: string,
    public message: string | ValidationError[]
  ) {}
}
