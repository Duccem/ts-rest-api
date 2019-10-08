import {Router} from 'express';
import {tokenValidation} from '../libs/validateToken';
const router:Router = Router();
import { signup, signin, profile } from '../controllers/authController';

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/profile',tokenValidation,profile);

export default router;