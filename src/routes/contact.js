import express from 'express';
const router = express.Router();

import { sendMail } from '$root/controllers/contact';

router.post('/', sendMail);

export default router;
