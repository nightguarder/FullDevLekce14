import { Schema, model } from "mongoose";
import Joi from "joi";

//Userschema using Joi
//https://joi.dev/api/?v=17.9.1
const userSchemaValidate = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(), //Ex. Requires the string value to only contain a-z, A-Z, and 0-9.
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^((?=S*?[A-Z])(?=S*?[a-z])(?=S*?[0-9]).{8,64})S$"))
    .required(),
  repeat_password: Joi.ref("password"),
  //Password has to contain one uppercase and lowecase letter and digit
  //Validate RegExp at:https://regex101.com/r/fX8dY0/1
});

type IUsers = {
  username: string;
  email: string;
  password: string;
};

const userSchema = new Schema<IUsers>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//Validating the SChema
try {
  const { error, value } = userSchemaValidate.validate(userSchema);
  console.log("Validation Passed:", value);
  //Continue to app..
} catch (error) {
  console.error("Validation Error:", error);
}

//Create new model to use by Services..
export const User = model<IUsers>("users", userSchema);
