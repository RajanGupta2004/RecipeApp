import express from 'express';
import {
  commentOnPost,
  createPost,
  fetchPostById,
  getAllPost,
  LikePost,
  Login,
  Register,
  getAllComments,
} from './Controllers.js';
import verifyToken from './middleware/auth.middleware.js';
import {upload} from './middleware/multer.middleware.js';

const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);
router.get('/post', getAllPost);
router.post('/add/post', verifyToken, upload.single('image'), createPost);
router.post('/post/:id/like', verifyToken, LikePost);
router.post('/post/:id/comment', verifyToken, commentOnPost);
router.get('/post/:id', fetchPostById);
router.get('/post/:id/comments', getAllComments);

export default router;
