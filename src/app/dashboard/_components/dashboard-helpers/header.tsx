"use client";
import React from "react";
import Image from "next/image";
import { Button, Title } from "@tremor/react";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

const HeaderComponent = () => {
  const router = useRouter();
  const { setHasuraToken } = useAuth();

  const doSignOut = () => {
    console.log("signing out");
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.error("Error during sign-out: ", error);
      });

    fetch("/api/logout", {
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        router.push("/login");
        setHasuraToken(null);
      }
    });
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center md: space-x-4">
        <Image src="/lanch_logo.png" alt="" width={30} height={30} />
        <Title className="invisible md:visible">LANCH Dashboard</Title>
      </div>
      <div className="flex items-center space-x-8">
        <Link
          className="underline text-blue-600 invisible md:visible"
          href="https://tally.so/r/npBk6y"
        >
          Feedback
        </Link>
        <Button onClick={doSignOut}>Logout</Button>
      </div>
    </div>
  );
};

export default HeaderComponent;
