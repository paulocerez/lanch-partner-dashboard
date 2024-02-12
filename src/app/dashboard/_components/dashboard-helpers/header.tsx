'use client';
import React from 'react';
import Image from 'next/image';
import {
  Button,
  Title
} from "@tremor/react";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from 'next/navigation';


const HeaderComponent = () => {

  const router = useRouter()

  const doSignOut = () => {
    // Add your sign out logic here
    console.log("signing out")
    signOut(auth).then(() => {
      console.log("logged out")
      // router.push("/login");
      // Sign-out successful.
    } ).catch((error) => {  
      // An error happened.
    }
    );
    //Add the cookie to the browser
    fetch("/api/logout", {
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        router.push("/login");
        //console.log("logged out")
      }
    });
    

  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Image src="/lanch_logo.png" alt="" width={30} height={30} />
        <Title>LANCH Dashboard</Title>
      </div>
      
      <Button onClick={doSignOut}>Logout</Button>
    </div>
  );
};

export default HeaderComponent;




