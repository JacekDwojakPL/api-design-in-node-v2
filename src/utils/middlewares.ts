import { validationResult } from 'express-validator';

export const validateInputs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ message: errors.array() });
  } else {
    next();
  }
};
