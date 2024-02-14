'use client'
import React, { useState, FormEvent } from 'react';
import HeaderComponent from "../dashboard/_components/dashboard-helpers/header";
import AdminUserList from "../dashboard/_components/admin/admin_user_list";


// Define the structure for the response data
interface AuthResponse {
  message: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // POST request to the server
    const response = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    // Only attempt to parse the response body as JSON if the status is 200 OK
    if (response.ok) {
      const data: AuthResponse = await response.json();
  
      // Show an alert window with the response message
      alert(data.message);
  
      setIsAuthenticated(true);
    } else {
      // For all other status codes, assume authentication failed
      alert('Authentication failed');
    }
  };

  return (
    <div>
      <HeaderComponent/>
      {isAuthenticated ? (
        // If authenticated, show the AdminUserList
        <AdminUserList/>
      ) : (
        // If not authenticated, show the login form
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      )}
    </div>
  );
}