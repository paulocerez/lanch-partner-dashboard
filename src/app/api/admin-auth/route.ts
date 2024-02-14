import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  const storedUsername = process.env.ADMIN_USERNAME;
  const storedPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  // If the request method is not POST, return a 405 Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (username === storedUsername) {
    console.log(password, storedPasswordHash)
    // Check if storedPasswordHash is defined
    if (storedPasswordHash) {
      // Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(password, storedPasswordHash);
      if (isMatch) {
        // Passwords match
        return res.status(200).json({ message: 'Authentication successful' });
      } else {
        // Passwords do not match
        return res.status(401).json({ message: 'Authentication failed' });
      }
    } else {
      // storedPasswordHash is undefined
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Usernames do not match
    return res.status(401).json({ message: 'Authentication failed' });
  }
}