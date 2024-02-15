'use client'
import React, { useState, FormEvent, useEffect, useLayoutEffect } from 'react';
import { sessionStatus } from '../utils/session';
import HeaderComponent from "../dashboard/_components/dashboard-helpers/header";
import AdminUserList from "../dashboard/_components/admin/admin_user_list";

// Define the structure for the response data
interface AuthResponse {
  message: string;
}

export default function Admin() {
  // const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // executes before content is rendered
  // if (password === 'partner-dashboard-2024') {
  //   setIsAuthenticated(true);
  // }



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // POST request to the server
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    console.log(password)

  
    // Only attempt to parse the response body as JSON if the status is 200 OK
    if (response.ok) {
      const data = await response.json();
      console.log("Successful authentication")
      setIsAuthenticated(true);
    } else {
      // For all other status codes, assume authentication failed
      alert('Authentication failed');
      console.log("Error during fetch: ", response.statusText)
    }
  };

  return (
    <div>
      <HeaderComponent/>
      {isAuthenticated && sessionStatus ? (
        <AdminUserList/>
      ) : (
        <div className='flex justify-center align-center items-center'>

        <div className='bg-white flex justify-center rounded-xl w-72 shadow-xl'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4 m-8 text-center'>
          <h1 className='decoration-solid font-bold'>Enter admin password</h1>
            {/* <input
            className='p-2 bg-slate-100 rounded-md' 
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              /> */}
            <input
            className='p-2 bg-slate-100 rounded-md text-md'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Log in</button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
} 