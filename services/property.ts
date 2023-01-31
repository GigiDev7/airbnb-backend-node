import { IProperty } from "../interfaces";
import Property from "../models/propertySchema";

export const createProperty = (propertyData: IProperty) => {
  return Property.create(propertyData);
};
