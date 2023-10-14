'use client';

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation"


export default function Home(){
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  return (
    <div>
      <h1>Home</h1>
      <p>{session.data?.user?.email}</p>
      <button onClick={()=> signOut()}>Logout</button>
      
    </div>
  )
}

Home.requireAuth = true;