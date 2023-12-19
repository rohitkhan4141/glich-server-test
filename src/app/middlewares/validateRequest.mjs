const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
    });
    return next(); 
  } catch (e) {
    next(e);
  }
};

export default validateRequest;
