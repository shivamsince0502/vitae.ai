// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { getDatabase } from '../config/mongodb';

// const jwtSecret = process.env.JWT_SECRET || 'your-jwt-secret';

// export const signUp = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const db = getDatabase();
//     const usersCollection = db.collection('users');

//     // Check if user already exists
//     const existingUser = await usersCollection.findOne({ email });
//     if (existingUser) {
//       res.status(400).json({ error: 'User already exists' });
//       return;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = { email, password: hashedPassword };
//     await usersCollection.insertOne(newUser);

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Sign Up Error:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };

// export const signIn = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const db = getDatabase();
//     const usersCollection = db.collection('users');

//     // Find user by email
//     const user = await usersCollection.findOne({ email });
//     if (!user) {
//       res.status(401).json({ error: 'Invalid email or password' });
//       return;
//     }

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       res.status(401).json({ error: 'Invalid email or password' });
//       return;
//     }

//     // Generate JWT
//     const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Sign In Error:', error);
//     res.status(500).json({ error: 'Failed to sign in' });
//   }
// };
