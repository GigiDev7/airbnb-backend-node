import { IProperty } from "../interfaces";
import Property from "../models/propertySchema";

export const createProperty = (propertyData: IProperty) => {
  return Property.create(propertyData);
};

export const findProperties = () => {
  return Property.find().populate(
    "createdBy ratings reviews",
    "-password -__v"
  );
};
