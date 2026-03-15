import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

router.post(
  '/',
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('message').trim().notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { name, company, email, phone, projectType, message } = req.body;
      // Aquí integrar envío a email (nodemailer, SendGrid, etc.) o guardar en DB
      console.log('Contact form:', { name, company, email, phone, projectType, message });
      res.status(201).json({ message: 'Mensaje recibido. Nos pondremos en contacto a la brevedad.' });
    } catch (e) {
      next(e);
    }
  }
);

export { router as contactRouter };
