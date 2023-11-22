'use client';
import React from 'react';
import Image from 'next/image';
import {
  Button,
  Title
} from "@tremor/react";


const HeaderComponent = () => {

  const signOut = () => {
    // Add your sign out logic here
    console.log("signing out")
    //Add the cookie to the browser
    fetch("/api/logout", {
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        //router.push("/login");
        console.log("logged out")
      }
    });
    

  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Image src="/lanch_logo.png" alt="" width={30} height={30} />
        <Title>LANCH Dashboard</Title>
      </div>
      
      <Button onClick={signOut}>Logout</Button>
    </div>
  );
};

export default HeaderComponent;




