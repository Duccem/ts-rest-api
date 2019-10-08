import {Router} from 'express';
import {tokenValidation} from '../libs/validateToken';
import { getComments, getComment, setComments, deleteComment, updateComment } from '../controllers/commentController';

const router:Router = Router();

router.get('/',getComments);
router.get('/:id',getComment);
router.post('/',tokenValidation,setComments);
router.post('/:id',tokenValidation,updateComment);
router.delete('/:id',tokenValidation,deleteComment);

export default router;