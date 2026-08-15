import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new ApiError(400, "Validation failed", errors);
      }

      req.body = result.data.body;
      req.params = result.data.params;
      req.query = result.data.query;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validate;