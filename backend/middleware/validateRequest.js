export const validateRequest = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Project name and description are required.",
    });
  }

  next();
};
