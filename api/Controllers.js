import User from './models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      data: {id: user._id, name: user.name, email: user.email, token},
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

    return res.status(201).json({
      success: true,
      data: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        token,
      },
    });
  } catch (error) {
    console.log('Error to login', error);
    return res
      .status(500)
      .json({success: 'false', message: 'Something went wrong.....'});
  }
};
