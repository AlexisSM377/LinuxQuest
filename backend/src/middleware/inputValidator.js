import { body, validationResult } from 'express-validator';

// Validadores reutilizables
export const validateEmail = body('email')
  .isEmail()
  .normalizeEmail()
  .trim()
  .withMessage('Email inválido');

export const validateUsername = body('username')
  .isLength({ min: 3, max: 20 })
  .trim()
  .matches(/^[a-zA-Z0-9_-]+$/)
  .withMessage('Username debe tener 3-20 caracteres (letras, números, -, _)');

export const validatePassword = body('password')
  .isLength({ min: 8 })
  .withMessage('Password debe tener al menos 8 caracteres');

// Middleware para manejar errores de validación
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Validar ID numérico
export const validateNumericId = (paramName = 'id') => {
  return body(paramName)
    .isInt({ min: 1 })
    .withMessage(`${paramName} debe ser un número válido`);
};

// Sanitizar texto
export const sanitizeText = (fieldName) => {
  return body(fieldName)
    .trim()
    .escape()
    .isLength({ min: 1, max: 500 })
    .withMessage(`${fieldName} es inválido`);
};
