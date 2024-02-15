import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';

dotenv.config();

export async function POST (req: NextApiRequest, res: NextApiResponse){
  const { password } = req.body;
  // const storedUsername = process.env.ADMIN_USERNAME;
  const storedPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  console.log(req.body)

if (req.method !== 'POST') {  
  // if (username === storedUsername) {
    // Check if storedPasswordHash is defined
    if (storedPasswordHash) {
      // Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(password, storedPasswordHash);
      if (isMatch) {
        // Passwords -> match
        return res.status(200).json({ message: 'Authentication successful' });
      } else {
        // Passwords -> no match
        return res.status(401).json({ message: 'Password is not correct' });
      }
    } else {
      // storedPasswordHash is undefined
      return res.status(500).json({ message: 'Server error' });
    }
  // } else {
  //   // Usernames -> no match
  //   return res.status(401).json({ message: 'Authentication failed' });
  // }
} else {
  // Method -> not allowed
  return res.status(405).json({ message: 'Method not allowed' });}
}