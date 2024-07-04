import { ZodError } from "zod";

const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default validateSchema;
