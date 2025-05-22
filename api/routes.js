import express from 'express';
import {createPost, getAllPost, Login, Register} from './Controllers.js';
import verifyToken from './middleware/auth.middleware.js';
import {upload} from './middleware/multer.middleware.js';

const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);
router.get('/post', getAllPost);
router.post('/add/post', verifyToken, upload.single('image'), createPost);

export default router;
