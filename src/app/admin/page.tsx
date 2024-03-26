"use client";

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import HeaderComponent from "../dashboard/_components/dashboard-helpers/header";
import AdminUserList from "../dashboard/_components/admin/admin_user_list";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { log } from "console";

interface DecodedToken {
  "https://hasura.io/jwt/claims": {
    "x-hasura-user-role": string;
  };
}

export default function Admin() {
  const router = useRouter();
  const { hasuraToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    console.log("Token in Admin component:", hasuraToken);
    if (hasuraToken) {
      try {
        console.log("34");
        const decodedToken = jwtDecode<DecodedToken>(hasuraToken);
        const hasuraClaims = decodedToken["https://hasura.io/jwt/claims"];

        if (hasuraClaims && hasuraClaims["x-hasura-user-role"] === "admin") {
          setIsAuthenticated(true);
          console.log("LAURIN");
        } else {
          router.push("/login");
          console.log("TEST");
        }
      } catch (error) {
        console.error("Failed to decode JWT: ", error);
        console.log("ANNA");
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [hasuraToken, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderComponent />
      <AdminUserList />
    </div>
  );
}
