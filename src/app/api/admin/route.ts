// src/app/api/admin/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Use named export for the POST method
// export default async function (req: NextApiRequest, res: NextApiResponse) {
//   const { password } = req.body;
//   const storedPasswordHash = process.env.ADMIN_PASSWORD_HASH;

//   if (!storedPasswordHash) {
//     console.error('The stored password hash is not defined.');
//     return res.status(500).json({ message: 'Server error' });
//   }

//   try {
//     const isMatch = await bcrypt.compare(password, storedPasswordHash);
//     if (isMatch) {
//       // Password matches
//       return res.status(200).json({ message: 'Authentication successful' });
//     } else {
//       // Password does not match
//       return res.status(401).json({ message: 'Authentication failed' });
//     }
//   } catch (error) {
//     console.error('Error comparing password:', error);
//     return res.status(500).json({ message: 'Error processing request' });
//   }
// }
