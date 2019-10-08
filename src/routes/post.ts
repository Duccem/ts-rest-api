import {Router} from 'express';
import {tokenValidation} from '../libs/validateToken';
import { getPosts, getPost, setPost, deletePost, updatePost } from '../controllers/postController';

const router:Router = Router();

router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',tokenValidation,setPost);
router.post('/:id',tokenValidation,updatePost);
router.delete('/:id',tokenValidation,deletePost);

export default router;