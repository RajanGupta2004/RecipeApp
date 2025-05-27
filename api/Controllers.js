import User from './models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Post from './models/post.model.js';
import Comment from './models/comments.model.js';

export const Register = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({status: 'success', message: 'All field are required....'});
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res
        .status(400)
        .json({success: false, message: 'User Already exist....'});
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const user = await User.create({name, email, password: hashedPassword});

    const privateKey = '123456';

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    const token = await jwt.sign(payload, privateKey, {expiresIn: '9h'});

    return res.status(201).json({
      success: true,
      user: {id: user._id, name: user.name, email: user.email},
      token,
    });
  } catch (error) {
    console.log('Error to Register', error);
    return res
      .status(500)
      .json({success: 'false', message: 'Something went wrong.....'});
  }
};

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: 'Both field are required...'});
    }

    const existingUser = await User.findOne({email});

    if (!existingUser) {
      return res.status(404).json({message: 'User Not found'});
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (isPasswordCorrect && email !== existingUser.email) {
      return res.status(401).json({message: 'You are not valid user'});
    }

    const privateKey = '123456';

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    };
    const token = await jwt.sign(payload, privateKey, {expiresIn: '9h'});

    return res.status(200).json({
      success: true,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error) {
    console.log('Error to login', error);
    return res
      .status(500)
      .json({success: 'false', message: 'Something went wrong.....'});
  }
};

export const createPost = async (req, res) => {
  try {
    const {recipeName, description} = req.body;
    const file = req.file;

    console.log('file', file);

    if (!recipeName || !description) {
      return res.status(400).json({message: 'All field are required...'});
    }

    if (!file) {
      return res.status(400).json({message: 'file is required...'});
    }

    const post = await Post.create({
      userId: req.user.id,
      recipeName,
      description,
      imageUrl: `public/upload/${file.originalname}`,
    });

    return res.status(201).json({post});
  } catch (error) {
    console.log('Error while creating post', error);
    return res.status(500).json({message: 'Something went wronge....'});
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find()
      .populate('userId', 'name email')
      .sort({createdAt: -1})
      .limit(20);

    if (!allPost) {
      return res.status(404).json({message: 'Post Not Found...'});
    }

    return res.status(200).json({post: allPost});
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({message: 'Something went wronge....'});
  }
};

export const LikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userInfo = req.user;
    if (!postId) {
      return res.status(400).json({message: 'Post id is required'});
    }

    const postExist = await Post.findById(postId);
    if (!postExist) {
      return res.status(404).json({message: 'Post not found...'});
    }

    if (!postExist.likes.includes(userInfo.id)) {
      postExist.likes.push(userInfo.id);
      await postExist.save();
    }

    return res.status(200).json({message: 'Post liked', post: postExist});
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({message: 'Something went wronge....'});
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const {comment} = req.body;
    if (!comment) {
      return res.status(400).json({message: 'comment is required...'});
    }

    const postExist = await Post.findById(postId);
    if (!postExist) {
      return res.status(404).json({message: 'Post not found...'});
    }

    const newComment = await Comment.create({
      postId: postExist._id,
      userId: userId,
      text: comment,
    });

    postExist.comments.push(newComment._id);

    await postExist.save();

    return res.status(200).json({
      message: 'Commented on post',
      comment: newComment,
    });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({message: 'Something went wronge....'});
  }
};

export const fetchPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('userId');
    if (!post) {
      return res.status(404).json({message: 'Post doest not exist...'});
    }

    return res.status(200).json({message: 'success', post});
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({message: 'Something went wronge....'});
  }
};

export const getAllComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comment = await Comment.find({postId: postId}).populate('userId');
    if (!comment) {
      return res.status(404).json({message: ' Comments Not  found....'});
    }

    return res.status(200).json({message: 'Success', comment});
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({message: 'Something went wronge....'});
  }
};
