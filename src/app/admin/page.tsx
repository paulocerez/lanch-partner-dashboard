"use client";

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import HeaderComponent from "../../components/dashboard/dashboard-helpers/Header";
import AdminUserList from "../../components/dashboard/admin/AdminUserList";
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
  const { hasuraToken, loading } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (loading) return;

    console.log("Token in Admin component:", hasuraToken); // currently null
    if (hasuraToken) {
      // not triggered
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
        // router.push("/login");
      }
    } else {
      //   router.push("/login");
      //   this gets logged at the moment
      console.log("HERE WE GO");
    }
  }, [hasuraToken, router, loading]);

  if (loading) {
    return <div>Loading authentication status...</div>;
  }

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
