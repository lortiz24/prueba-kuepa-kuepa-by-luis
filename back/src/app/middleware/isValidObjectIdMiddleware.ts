import { Types } from "mongoose";

export const validateObjectId = (req, res, next) => {
  const { _id } = req.params;
  if (!Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  next();
};
